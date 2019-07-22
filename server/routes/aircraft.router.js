const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

//we'll need to send this as a transaction...those look better as an async await
//thus we declare our callback function async
router.post('/add', rejectUnauthenticated, async (req, res) => {    
    //a transaction has to be sent via a single consistent connection
    //so we establish a solid connection.
    const connection = await pool.connect();

    //separate our variables out of our request.
    const aircraft = req.body.aircraft;
    const operator = req.body.operator;
    const owner = req.body.owner;

    //lets also store some variables to reference the 
    //new sql table id's we'll be creating
    let owner_id = 0;
    let owner_address_id = 0;
    let operator_id = 0;
    let operator_address_id = 0;
    
    //Query to stash address for both owner and operator
    const addressQuery = `
        INSERT INTO "address" (streetaddr, city, state, postalcode)
        VALUES ($1, $2, $3, $4)
        RETURNING "id";
    `
    //query to stash owner info
    const ownerQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id)
        SELECT $1, $2, $3, CAST($4 AS VARCHAR), $5, $6, $7, $8
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $4
                AND
                "peopletype" = $6
            )
        )
        RETURNING "id";
    `
    //query to stash operator info
    const operatorQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id)
        SELECT $1, $2, $3, CAST($4 AS VARCHAR), $5, $6, $7, $8
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $4
                AND
                "peopletype" = $6
            )
        )
        RETURNING "id";                
    `
    //query to stash aircraft info
    const aircraftQuery = `
        INSERT INTO "aircraft" (tailnumber, typeaircraft, color, callsign, cbpdecalnbr, owner_id, operator_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `

    /*
    here's the business...we're going to send this as a SQL transaction
    we'll be sending ALL the data or NONE of the data. After the transaction
    is either successful or a failure...we must release our connection to the database.
    */
    try{
        /**********
        all transactions begin with a "BEGIN" and end with a "COMMIT"
        declaring these queries as an "await" will allow us to wait for 
        responses from the database before we start the next query.
        all of these queries requre that we have an id from the last query.
        **********/       

        await connection.query('BEGIN');
        let result = await connection.query(addressQuery, [owner.streetAddress, owner.city, owner.state, owner.postalCode])
        owner_address_id = result.rows[0].id;

        result = await connection.query(ownerQuery, [owner.lastName, owner.firstName, owner.middleName, owner.email, owner.phoneNumber, 4, req.user.id, owner_address_id])
        owner_id = result.rows[0].id;

        result = await connection.query(addressQuery, [operator.streetAddress, operator.city, operator.state, operator.postalCode])
        operator_address_id = result.rows[0].id;

        result = await connection.query(operatorQuery, [operator.lastName, operator.firstName, operator.middleName, operator.email, operator.phoneNumber,3, req.user.id, operator_address_id])
        operator_id = result.rows[0].id;        

        await connection.query(aircraftQuery, [aircraft.tailNumber, aircraft.type, aircraft.color, aircraft.callSign, aircraft.CBP, owner_id, operator_id])

        await connection.query('COMMIT');
        res.sendStatus(201);
    }catch(error){
        /**
         * If the transaction fails at any point in the process
         * we'll "ROLLBACK" the transaction...all the data is released.
         * no changes are made
         */

        await connection.query('ROLLBACK');
        console.log('Transaction Error with post aircraft', error);
        res.sendStatus(500);
    }finally{
        //whatever the case we release the connection
        connection.release();
    } 
});


// Get aircraft information from database to crew settings view.
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT "aircraft".*, "people".firstname as operator_firtname, "people".lastname as operator_lastname, "owner".firstname as owner_firstname, "owner".lastname as owner_lastname FROM "aircraft"
        JOIN "people" ON  "people".id = "aircraft".operator_id
        JOIN "people" as owner ON  "owner".id = "aircraft".owner_id 
        JOIN "user" On "user".id = "people".user_id
        WHERE "user".id = $1
        AND "aircraft".active= TRUE;`
    pool.query(sqlQuery, [req.user.id]).then(result => {
        console.log(' Aircraft Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Aircraft GET', err);
        res.SendStatus(500)
    })
});

// Send Aircraft information to Reducer to update form
router.get('/updateaircraft/:id', rejectUnauthenticated, (req, res) => {
let updateAircraftId = req.params.id
    const sqlQuery = `SELECT "aircraft".id, "aircraft".tailnumber AS "tailNumber", "aircraft".typeaircraft AS "type", "aircraft".color, "aircraft".callsign AS "callSign", "aircraft".cbpdecalnbr AS "CBP",
        "people".firstname as operator_firtname, "people".lastname as operator_lastname, "owner".firstname as owner_firstname, "owner".lastname as owner_lastname FROM "aircraft"
        JOIN "people" ON  "people".id = "aircraft".operator_id
        JOIN "people" as owner ON  "owner".id = "aircraft".owner_id 
        JOIN "user" On "user".id = "people".user_id
        WHERE "user".id = $1
        AND "aircraft".id = $2
        AND "aircraft".active= TRUE;`
    pool.query(sqlQuery, [req.user.id, updateAircraftId]).then(result => {
        console.log(' Aircraft Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Aircraft GET', err);
        res.SendStatus(500)
    })
});

// Send Operator information to Reducer to update form
router.get('/updateoperator/:id', rejectUnauthenticated, (req, res) => {
    let updateOperatorId = req.params.id
    const sqlQuery = `SELECT "people".id, "people".permanentaddress_id, "people".firstname AS "firstName", "people".middlename AS "middleName", "people".lastname AS "lastName",
            "address".streetaddr AS "streetAddress", "address".city, "address".state, "address".postalcode AS "postalCode",
            "people".emailaddr AS "email", "people".telephonenbr AS "phoneNumber" FROM "aircraft"
        JOIN "people" ON  "people".id = "aircraft".operator_id
        JOIN "address" ON "address".id = "people".permanentaddress_id
        JOIN "user" On "user".id = "people".user_id
        WHERE "user".id = $1
        AND "aircraft".id = $2
        AND "aircraft".active = TRUE;`
    pool.query(sqlQuery, [req.user.id, updateOperatorId]).then(result => {
        console.log(' Operator Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Operator GET', err);
        res.SendStatus(500)
    })
});


// Send owner information to Reducer to update form
router.get('/updateowner/:id', rejectUnauthenticated, (req, res) => {
    let updateOwnerId = req.params.id
    const sqlQuery = `SELECT "people".id, "people".permanentaddress_id, "people".firstname AS "firstName", "people".middlename AS "middleName", "people".lastname AS "lastName",
     "address".streetaddr AS "streetAddress", "address".city, "address".state, "address".postalcode AS "postalCode",
    "people".emailaddr AS "email", "people".telephonenbr AS "phoneNumber" FROM "aircraft"
    JOIN "people" ON  "people".id = "aircraft".owner_id
JOIN "address" ON "address".id = "people".permanentaddress_id
JOIN "user" On "user".id = "people".user_id
WHERE "user".id = $1
AND "aircraft".id = $2
AND "aircraft".active = TRUE;`
    pool.query(sqlQuery, [req.user.id, updateOwnerId]).then(result => {
        console.log(' Owner Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Owner GET', err);
        res.SendStatus(500)
    })
});

//  PUT to remove aircraft info on aircraft settings view. Change active status to false. Note this does not delete aircraft but archives it from user.
router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
    let deleteId = req.params.id
    const sqlQuery = `
         UPDATE "aircraft"
        SET "active" = false
        WHERE "id" = $1;
    `;
    pool.query(sqlQuery, [deleteId]).then(result => {
        console.log('Result', result.rows);
        res.send(200)
    }).catch(err => {
        console.log('Error in DELETE', err);
        res.SendStatus(500)
    })
});

router.put('/update', rejectUnauthenticated, async (req, res) => {
    console.log("req.body in update:", req.body);

    const aircraft = req.body.aircraft;
    const operator = req.body.operator;
    const owner = req.body.owner;

    let owner_id = owner.id;
    let owner_address_id = owner.permanentaddress_id;
    let operator_id = operator.id;
    let operator_address_id = operator.permanentaddress_id;

    const addressQuery = `
        UPDATE "address"
        SET "streetaddr" = $1, "city" = $2, "state" = $3, "postalcode" = $4
        WHERE "id" = $5;
    `;

    const personQuery = `
        UPDATE "people"
        SET "lastname" = $1, "firstname" = $2, "middlename" = $3, "emailaddr" = $4, "telephonenbr" = $5
        WHERE "id" = $6;
    `;

    const aircraftQuery = `
        UPDATE "aircraft"
        SET "tailnumber" = $1, "typeaircraft" = $2, "color" = $3, "callsign" = $4, "cbpdecalnbr" = $5
        WHERE "id" = $6;
    `;

    const connection = await pool.connect();

    try{
        await connection.query('BEGIN');

        await connection.query(addressQuery, [owner.streetAddress, owner.city, owner.state, owner.postalCode, owner_address_id]);
        console.log('owner address');
        await connection.query(personQuery, [owner.lastName, owner.firstName, owner.middleName, owner.email, owner.phoneNumber, owner_id]);
        console.log('owner update');

        await connection.query(addressQuery, [operator.streetAddress, operator.city, operator.state, operator.postalCode, operator_address_id]);
        console.log('operator address');
        await connection.query(personQuery, [operator.lastName, operator.firstName, operator.middleName, operator.email, operator.phoneNumber, operator_id]);
        console.log("operator update");

        await connection.query(aircraftQuery, [aircraft.tailNumber, aircraft.type, aircraft.color, aircraft.callSign, aircraft.CBP, aircraft.id])
        console.log('aircraft update');

        await connection.query('COMMIT');
        res.sendStatus(201);
    }catch (error){
        await connection.query('ROLLBACK');
        console.log("transaction error with update aircraft", error);
        res.sendStatus(500);
    }finally{
        connection.release();
    }
})


module.exports = router;