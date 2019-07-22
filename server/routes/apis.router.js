const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const xmlGenerator = require('../modules/xml-generator');

/*** POST apis route ***/
router.post('/', rejectUnauthenticated, async (req, res) => {    

    //returning data from DB queriess
    let airport_id_One = 0;
    let airport_id_Two = 0;
    let airport_id_Three = 0;
    let airport_id_Four = 0;
    let itinerary_id_One = 0;
    let itinerary_id_Two = 0;
    let flight_id_One = 0;
    let flight_id_Two = 0;

    //setting results
    let result;

    //objects
    let crewData = req.body.crew;
    let aircraftData = req.body.aircraft;
    let flightSegmentOneData = req.body.flightSegmentOne;
    let flightSegmentTwoData = req.body.flightSegmentTwo; 

    //array of objects
    let paxData = req.body.passenger;
    let flightStatusNum = 2;

    //XML GET data
    let flightAircraftXML;
    let crewMemberData;
    let paxMemberData = req.body.passenger;
    
    //crew member person ID
    let crewMemberID = req.body.crew.id;
    
    // adds airport data returns airport id
    const airportPost = `INSERT INTO "airport" ("airportcode", 
                         "city", 
                         "cntrycode", 
                         "state", 
                         "description") 
                         SELECT $1, $2, $3, $4, $5 
                         RETURNING "airport".id ;`

    //adds to the itinerary table. Includes all pertinent data returns itinerary id
    const itineraryPost = `INSERT INTO "itinerary" ("departure_airport_id", 
                            "localdeparturetimeStamp", 
                            "inboundarrivalLocation_airport_id", 
                            "localarrivaltimestamp")
                           VALUES ($1, $2, $3, $4)
                           RETURNING "itinerary".id;`
    ;
    //adds to the flight table. Includes all pertinent data. returns the flight id
    const flightPost = `INSERT INTO "flight" ("itinerary_id", 
                        "emergencycontact_id", 
                        "aircraft_id", 
                        "operator_id", 
                        "owner_id", 
                        "flight_status")
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING "flight".id;`
    //adds to the user_itinerary table. Includes all pertinent data
    const userItineraryPost = `INSERT INTO "user_itinerary" ("user_id", 
                              "itinerary_id")
                               VALUES ($1, $2);`
    //adds to the flight_people table. Includes all pertinent data
    const flightPeoplePost = `INSERT INTO "flight_people" ("people_id", 
                              "flight_id")
                              VALUES ($1, $2); `
    // first part of the GET(s) to collect all the data for the XML documents.
    // gets airport data, itinerary data, aircraft data including owner and operator and address info based off the flight id that was posted
    const xmlGetOne = `SELECT 
		--airport data
        flightbuilding1.airportcode AS inboundAirportCode,
        flightbuilding1.city AS inboundAirportCity,
        flightbuilding1.description AS inboundAiportDesc,
        flightbuilding1.cntrycode AS inboundCountryCode,
        flightbuilding1.state AS inboundAirportState,
        flightbuilding2.city AS departureAirportCity,
        flightbuilding2.cntrycode AS departureCountryCode,
        flightbuilding2.airportcode AS departureAirportCode,
        flightbuilding2.state AS departureAirportState,
        flightbuilding2.description AS departureAirportDesc,
		
		--itinerary data
		it."localdeparturetimeStamp" AS departureTimeStamp, 
		it.localarrivaltimestamp AS arrivalTimeStamp,
 	    flightBuilding2.airportcode AS departureAirportcode,
 	    
 	    --aircraft info
 	    "aircraft".tailnumber,
 	    "aircraft".typeaircraft,
 	    "aircraft".color,
 	    "aircraft".callsign,
	    "aircraft".cbpdecalnbr,
	    
	    -- owner info
	    "p1".firstname AS ownerfirstname,
	    "p1".middlename AS ownermiddlename, 
	    "p1".lastname AS ownerlastname,
	    "p1".birthdate AS ownerbirthdate,
	    "p1".sex AS ownersex,
	    "p1".residencecntry AS ownerresidencecountry,
	    "p1".citizenshipcntry AS ownercitizenshipcountry,
	    "p1".emailaddr AS owneremail,
	    "p1".telephonenbr AS ownertelephonenbr,
	    p1.permanentaddress_id AS owneraddressid,
	    
	    --owner address info
	    owneraddress.streetaddr AS ownerstreetaddr,
	    owneraddress.city AS ownercity,
	    owneraddress.state AS ownerstate,
	    owneraddress.postalcode AS ownerpostalcode,
	    owneraddress.countrycode AS ownercountrycode,

		-- operator info
	    "p2".firstname AS operatorfirstname,
	    "p2".middlename AS operatormiddlename,
	    "p2".lastname AS operatorlastname,
	    "p2".birthdate AS operatorbirthdate,
	    "p2".sex AS operatorsex,
	    "p2".residencecntry AS operatorresidencecountry,
	    "p2".citizenshipcntry AS operatorcitizenshipcountry,
	    "p2".emailaddr AS operatoremail,
	    "p2".telephonenbr AS operatortelephonenbr,
	    p2.permanentaddress_id AS operatoraddressid, 
	    
	     --operator address info
	    operatoraddress.streetaddr AS operatorstreetaddr,
	    operatoraddress.city AS operatorcity,
	    operatoraddress.state AS operatorstate,
	    operatoraddress.postalcode AS operatorpostalcode,
	    operatoraddress.countrycode AS operatorcountrycode
	    
	    
        from "itinerary" AS it
        inner join "airport" as flightbuilding1 on it.departure_airport_id = flightbuilding1.id
        inner join "airport" as flightbuilding2 on it."inboundarrivalLocation_airport_id" = flightbuilding2.id
        LEFT JOIN "user_itinerary" ON it.id = "user_itinerary".itinerary_id

        LEFT JOIN "flight" AS f1 ON it.id = "f1".itinerary_id
        JOIN "aircraft" ON f1.aircraft_id = "aircraft".id

        full JOIN "people" AS p1 ON f1.owner_id = p1.id --owner
        left join "address" as owneraddress on owneraddress.id = p1.permanentaddress_id -- owner address

        full JOIN "people" AS p2 ON f1.operator_id = p2.id --operator
        left join "address" as operatoraddress on operatoraddress.id = p2.permanentaddress_id -- op address

        WHERE f1.id = $1;`
    //gets all the crew data for the XML doc
    const xmlGetCrew = `SELECT  --crew data
		people.firstname AS crewInfoFirstName,
		people.middlename AS crewInfoMiddleName,
		people.lastname AS crewInfoLastName, 
		people.birthdate AS crewInfobirthdate,
		people.sex AS crewInfoSex,
		people.residencecntry AS crewInfoResidenceCountry,
		people.citizenshipcntry AS crewInfoCitizenshipCountry,
		people.emailaddr AS crewInfoEmail,
		people.telephonenbr AS crewInfoPhoneNbr,
		people.peopletype AS crewInfoPeopleType,
		people.permanentaddress_id AS crewInfoPermAddrID,
		people.addresswhileinus_id AS crewInfoAddrInUSID,
		
		--CREW DOCS DATA
		"document".doccode AS crewdoccode,
		"document".documentnbr AS crewdocnbr,
		"document".cntrycode AS crewdoccountrycode,
		"document".expirydate AS crewdocexpirationdate,
		"document".people_id AS crewdocpeopleid,
		
		-- CREW EMERGENCY CONTACT INFO
		"emergencycontacts".firstname AS emergencycontactfirstname,
		"emergencycontacts".middlename AS emergencycontactmiddlename,
		"emergencycontacts".lastname AS emergencycontactlastname,
		"emergencycontacts".telephonenbr AS emergencycontactphonenbr,
		"emergencycontacts".emailaddr AS emergencycontactemail,

		-- crew address info
		"address".city,
		"address".streetaddr,
		"address".state,
		"address".postalcode,
		"address".countrycode
		
        from "people" 
        left JOIN "address" on "people".permanentaddress_id = "address".id
        JOIN "document" on "people".id = "document".people_id
        JOIN "people_emergencycontacts" on "people".id = "people_emergencycontacts".people_id
        JOIN "emergencycontacts" on "people_emergencycontacts".emergencycontact_id = "emergencycontacts".id
        where "people".id = $1`

     
    const connection = await pool.connect();
    console.log('in CONNECTION');
    console.log('CREW MEMBER ID HERE: ', crewMemberID);
    //async await post and GET
    try {
        await connection.query('BEGIN');
        
        let departure = flightSegmentOneData.departure;
        let arrival = flightSegmentOneData.arrival;
        console.log('arrival ONE', arrival);
        
        //AIRPORT POST
        result = await connection.query(airportPost, 
            [departure.airport, 
            departure.city, 
            departure.country, 
            departure.state,
            departure.description])
            airport_id_One = result.rows[0].id;
            console.log('IN AIRPORT ONE', airport_id_One);
            
        result = await connection.query(airportPost, 
            [
              arrival.airport,
              arrival.city,
              arrival.country,
              arrival.state,
              arrival.description
            ])
            airport_id_Two = result.rows[0].id;
            console.log('IN AIRPORT TWO');
        departure = flightSegmentTwoData.departure;
        arrival = flightSegmentTwoData.arrival;
        
        result = await connection.query(airportPost, 
            [departure.airport, 
            departure.city, 
            departure.country, 
            departure.state,
            departure.description])
            airport_id_Three = result.rows[0].id;
                console.log('IN AIRPORT THREE');
        result = await connection.query(airportPost, 
            [
              arrival.airport,
              arrival.city,
              arrival.country,
              arrival.state,
              arrival.description
            ])
            airport_id_Four = result.rows[0].id;
            console.log('IN AIRPORT FOUR');
    // ITINERARY POST
        let testTime = flightSegmentOneData.departure.date + 'T' + flightSegmentOneData.departure.time + ':00CST';
        console.log('TEST TIME HERE', testTime);

        result = await connection.query(itineraryPost, 
                [
                    airport_id_One, 
                    flightSegmentOneData.departure.date + 'T' + flightSegmentOneData.departure.time + ':00CST',
                    airport_id_Two,
                    flightSegmentOneData.arrival.date + 'T' + flightSegmentOneData.arrival.time + ':00CST'
                ])
                itinerary_id_One = result.rows[0].id;
                console.log('in Itinerary ONE', itinerary_id_One);
                
                
        result = await connection.query(itineraryPost, 
                [
                    airport_id_Three, 
                    departure.date + 'T' + departure.time + ':00CST',
                    airport_id_Four,
                    arrival.date + 'T' + arrival.time + ':00CST'
                ])
                itinerary_id_Two = result.rows[0].id;
                console.log('in Itinerary TWO', itinerary_id_Two);

        // FLIGHT POST
        console.log('right before FLIGHT with itinerary stuff: ', itinerary_id_One);
        //console.log('itinerary ID 2 data here: ', itinerary_id_Two);
        console.log('owner info :', aircraftData.owner_id);
        console.log('operator info: ', aircraftData.operator_id);
        console.log('aircraft info: ', aircraftData.id);
        console.log('emergency id stuff: ', crewData.emergency_id);
        console.log('flight status: ', flightStatusNum);
    
        result = await connection.query(flightPost,
            [
                itinerary_id_One,
                crewData.emergency_id,
                aircraftData.id,
                aircraftData.operator_id,
                aircraftData.owner_id,
                flightStatusNum
            ]) 
            flight_id_One = result.rows[0].id;
            console.log('in flight ONE', flight_id_One);
        //post second flight
        result = await connection.query(flightPost,
            [
                itinerary_id_Two,
                crewData.emergency_id,
                aircraftData.id,
                aircraftData.operator_id,
                aircraftData.owner_id,
                2
            ])
        flight_id_Two = result.rows[0].id;
        console.log('in flight TWO', flight_id_Two);
    
    // USER_ITINERARY POST
        await connection.query(userItineraryPost,
            [
                req.user.id,
                itinerary_id_One
            ])
            console.log('in user_itinerary ONE');
        //post second itinerary
        await connection.query(userItineraryPost,
            [
                req.user.id,
                itinerary_id_Two
            ])
            console.log('in user_itinerary TWO');
    //FLIGHT_PEOPLE POST
        //crew post
        console.log('crew INFO HERE1', crewData);
        
        await connection.query(flightPeoplePost,
            [
                crewData.id,
                flight_id_One
            ])
            console.log('in flight_people ONE');
        await connection.query(flightPeoplePost,
            [
                crewData.id,
                flight_id_Two
            ])
            console.log('in flight_people TWO');
        //passenger post
        console.log('paxData:', paxData);
        for(let i=0; i < paxData.length; i++){
            console.log(`paxperson: ${i}, ${paxData[i]}`)
            await connection.query(flightPeoplePost,
                [
                    paxData[i].id,
                    flight_id_One
                ])
            console.log(`in passenger ${i+1}`);
            await connection.query(flightPeoplePost,
                [
                    paxData[i].id,
                    flight_id_Two
                ])
            console.log(`in passenger2 ${i+1}`);
        } 
        //committing all posts
        await connection.query('COMMIT');
    result = await connection.query(xmlGetOne, [flight_id_One])
            flightAircraftXML = result.rows;
            console.log('back from xmlGetOne with results: ', flightAircraftXML);
            
    result = await connection.query(xmlGetCrew, [crewMemberID])
            crewMemberData = result.rows;
            console.log('back from xmlGetCrew with results: ', crewMemberData);

        console.log('made it through');
        let xmlObj = {
            itinerary: flightAircraftXML[0],
            crew: crewMemberData[0],
            pax: paxData
        }
        // axios.post('/api/xml/generate', xmlObj)
        let xmlAPIS = xmlGenerator(xmlObj);
        console.log('xmlApis:', xmlAPIS);
        res.sendStatus(201);
    }
    catch(error){
        console.log('error in post apis:', error);
        await connection.query('ROLLBACK');
        res.sendStatus(500);
    }
    finally{
        connection.release();
    }
});

module.exports = router;