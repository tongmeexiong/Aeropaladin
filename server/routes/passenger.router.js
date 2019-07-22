const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Get passenger information from database to crew settings view.
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT "document".*, "address".*, "people".id, "people".firstname, "people".lastname, "people".birthdate,
        "people".sex, "people".residencecntry, "people".citizenshipcntry FROM "people"
        JOIN "address" ON "address".id = "people".addresswhileinus_id
        JOIN "document" ON "document".people_id = "people".id
        WHERE "people".peopletype <= 4 
        AND "people".active = TRUE
        AND "people".user_id = $1;
    `
    pool.query(sqlQuery, [req.user.id]).then(result => {
        console.log(' Passenger Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Passenger GET', err);
        res.SendStatus(500)
    })
});  

//  PUT to remove passenger info on passenger settings view. Change active status to false. Note this does not delete passenger but archives it from user.
router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
    let deleteID = req.params.id
    console.log('DELETE', deleteID);
    const sqlQuery = `UPDATE "people"
        SET "active" = false
        WHERE "id" = $1;
    `
    pool.query(sqlQuery, [deleteID]).then(result => {
        console.log('DELETEEEEEE', result);
        res.sendStatus(200)
    }).catch(err => {
        console.log('Error in DELETE', err);
        res.SendStatus(500)
    })
});

// Send PASSENGER information to Reducer to update on form view
router.get('/updatepassenger/:id', rejectUnauthenticated, (req, res) => {
    let updatePassengerId = req.params.id
    console.log('id', updatePassengerId, req.user.id);
    
    const sqlQuery = `SELECT "people".id, "people".firstname AS "firstName", "people".lastname AS "lastName",
        "people".middlename AS "middleName", "people".telephonenbr AS "phoneNumber", "people".birthdate AS "birthDate",
        "people".sex, "people".residencecntry AS "residenceCountry", "people".citizenshipcntry AS "citizenShipCountry",
        "people".emailaddr AS "email", "address".postalcode AS "postalCode", "address".state, "address".city,"address".streetaddr AS "streetAddress" FROM "people"
        JOIN "address" ON "address".id = "people".addresswhileinus_id
        WHERE "people".peopletype <= 4
        AND "people".id = $1
        AND "people".user_id = $2;
    `
    pool.query(sqlQuery, [updatePassengerId, req.user.id]).then(result => {
        console.log(' Passenger Update Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Passenger Update GET', err);
        res.SendStatus(500)
    })
});

// Send passenger document one to Reducer to the update form view
router.get('/updatedocument1/:id', rejectUnauthenticated, (req, res) => {
    let updateDocumentId = req.params.id
    const sqlQuery = `SELECT "document".id, "document".documentnbr AS "documentNumber","document".doccode AS "documentType","document".expirydate AS "expiryDate", "document".cntrycode AS "residenceCountry"  FROM "people" as people_table
        JOIN "document" ON "document".people_id = "people_table".id
        WHERE people_table.peopletype = 1
        AND people_table.id = $1
        AND people_table.user_id = $2
        ORDER BY "document".id DESC
        LIMIT 1;
    `
    pool.query(sqlQuery, [updateDocumentId, req.user.id]).then(result => {
        console.log(' Passenger Document One Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Passenger Document One  GET', err);
        res.SendStatus(500)
    })
});

// Send passenger document two to Reducer to the update form view
router.get('/updatedocument2/:id', rejectUnauthenticated, (req, res) => {
    let updateDocumentId = req.params.id
    const sqlQuery = `SELECT "document".id, "document".documentnbr AS "documentNumber","document".doccode AS "documentType","document".expirydate AS "expiryDate", "document".cntrycode AS "residenceCountry"  FROM "people" as people_table
        JOIN "document" ON "document".people_id = "people_table".id
        WHERE people_table.peopletype = 1
        AND people_table.id = $1
        AND people_table.user_id = $2
        ORDER BY "document".id DESC
        LIMIT 1
        OFFSET 1;
    `
    pool.query(sqlQuery, [updateDocumentId, req.user.id]).then(result => {
        console.log(' Passenger Document Two Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Passenger Document Two GET', err);
        res.SendStatus(500)
    })
});



router.post('/add', rejectUnauthenticated, async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.body.passenger:', req.body.passenger);
    console.log('req.body.travelDocumentOne:', req.body.travelDocumentOne);
    console.log('is there a travel document two:', (req.body.travelDocumentTwo) ? true : false)

    const connection = await pool.connect();

    const passenger = req.body.passenger;
    const travelDocumentOne = req.body.travelDocumentOne;
    const travelDocumentTwo = req.body.travelDocumentTwo;

    let passenger_address_id = 0;
    let passenger_id = 0;
    
    const addressQuery = `
        INSERT INTO "address" (streetaddr, city, state, postalcode, countrycode)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
    `
    const passengerQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, birthdate, sex, residencecntry, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id, addresswhileinus_id, citizenshipcntry)
        SELECT $1, $2, $3, $4, $5, $6, CAST($7 AS VARCHAR), $8, $9, $10, $11, $12, $13
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $7
                AND
                "peopletype" = $9
            )
        )
        RETURNING "id";
    `

    const documentQuery = `
        INSERT INTO "document" (doccode, documentnbr, expirydate, cntrycode, people_id)
        SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR), $3, $4, $5
        WHERE NOT EXISTS(
            SELECT * FROM "document"
            WHERE(
                "doccode" = $1
                AND
                "documentnbr" = $2
            )
        );
    `

    try{
        await connection.query('BEGIN');
        let result = await connection.query(addressQuery, [passenger.streetAddress, passenger.city, passenger.state, passenger.postalCode, passenger.residenceCountry])
        passenger_address_id = result.rows[0].id;
        console.log('got all the way to address', result.rows[0].id);

        result = await connection.query(passengerQuery, [passenger.lastName, passenger.firstName, passenger.middleName, passenger.birthDate, passenger.sex, passenger.residenceCountry, passenger.email, passenger.phoneNumber, 1, req.user.id, passenger_address_id, passenger_address_id, passenger.residenceCountry])
        passenger_id = result.rows[0].id;
        console.log('got all the way to passenger', result.rows[0].id);

        await connection.query(documentQuery, [travelDocumentOne.documentType, travelDocumentOne.documentNumber, travelDocumentOne.expiryDate, travelDocumentOne.residenceCountry, passenger_id])
        console.log('got all the way to doc 1');
        if(travelDocumentTwo){
            await connection.query(documentQuery, [travelDocumentTwo.documentType, travelDocumentTwo.documentNumber, travelDocumentTwo.expiryDate, travelDocumentTwo.residenceCountry, passenger_id])
            console.log('got all the way to doc 2');
        }
        await connection.query('COMMIT');
        console.log('made it through');
        res.sendStatus(201);
    }catch(error){
        await connection.query('ROLLBACK');
        res.sendStatus(500);
    }finally{
        connection.release();
    }
})

router.put('/update', rejectUnauthenticated, async (req, res) => {
    console.log('req.body for update passenger:', req.body);
    res.sendStatus(201);
})


module.exports = router;
