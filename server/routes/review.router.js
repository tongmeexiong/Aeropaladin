const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/:id', rejectUnauthenticated, (req, res) => {
    let reviewPageId = req.params.id;
    
    
    const sqlQuery = `
    SELECT plane.tailnumber AS planetailnum, 
		p.firstname AS operatorfirstname, 
		p.lastname AS operatorlastname ,
		p1.firstname AS ownerfirstname,
		p1.lastname AS ownerlastname,
		
  		json_agg(json_build_object(
					'crew_paxFirstName', p2.firstname,
					'crew_paxMiddleName', p2.middlename,
					'crew_paxLastName', p2.lastname,
					'crew_paxPeopleType', p2.peopletype
					)) AS crewPaxPeople,
					
		flightbuilding.city AS departureAirportCity,
		flightbuilding.cntrycode AS departureAirportCntry,
		flightbuilding2.city AS arrivalAirportCity, 
		flightbuilding2.cntrycode AS arrivalAirportCntry,
		it.departure_airport_id, 
 		it."inboundarrivalLocation_airport_id", 
		it2.localarrivaltimestamp, 
		it2."localdeparturetimeStamp" 

    FROM "flight" 
    LEFT JOIN "itinerary" AS it ON "flight".itinerary_id = it.id
    LEFT JOIN "itinerary" AS it2 ON "flight".itinerary_id = it2.id 
    LEFT JOIN "aircraft" AS plane ON "flight".aircraft_id = plane.id
    LEFT JOIN "people" AS p ON "flight".operator_id = p.id
    LEFT JOIN "people" AS p1 ON "flight".owner_id = p1.id
    LEFT JOIN "flight_people" ON "flight".id = "flight_people".flight_id
    LEFT JOIN "people" as p2 ON "flight_people".people_id = p2.id		
    LEFT JOIN "airport" as flightbuilding ON it.departure_airport_id = flightbuilding.id
    LEFT JOIN "airport" as flightbuilding2 ON it."inboundarrivalLocation_airport_id" = flightbuilding2.id

    WHERE "flight".id = $1

    GROUP BY planetailnum, 
            operatorfirstname, 
            operatorlastname, 
            ownerfirstname, 
            ownerlastname, 
            flightbuilding.city, 
            flightbuilding.cntrycode, 
            flightbuilding2.city, 
            flightbuilding2.cntrycode, 
            it.departure_airport_id, 
 		    it."inboundarrivalLocation_airport_id", 
		    it2.localarrivaltimestamp, 
		    it2."localdeparturetimeStamp";`
    

    pool.query(sqlQuery, [reviewPageId]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Review GET', err);
        res.SendStatus(500)
    })

});





module.exports = router;
