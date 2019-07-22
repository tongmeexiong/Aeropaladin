const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => { 
  console.log('inside post user route with req.body: ', req.body); 
  console.log('req.user is HERE: ', req.user);
  
  const username = req.body.username;
  const firstname = req.body.firstname;
  const middlename = req.body.middlename;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const lastname = req.body.lastname;
  const streetaddr = req.body.streetaddr;
  const city = req.body.city;
  const state = req.body.state;
  const postalcode = req.body.postalcode;
  const countrycode = req.body.countrycode;
  const birthdate = req.body.birthdate;
  const sex = req.body.sex;
  let newUserId = 0;

  const queryText = `INSERT INTO "user" (username, firstname, lastname, password, email, phonenumber) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id;`;

  const queryTextTwo = `INSERT INTO "address" (streetaddr, city, state, postalcode, countrycode)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING "address".id;`

  const queryTextThree = `INSERT INTO "people" (lastname, firstname, middlename, birthdate, sex, residencecntry, 
    citizenshipcntry, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id, addresswhileinus_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`

  pool.query(queryText, [username, firstname, lastname, password, email, phonenumber])
    .then((result) => {
      newUserId = result.rows[0].id;
      console.log('first post done');
      pool.query(queryTextTwo, [streetaddr, city, state, postalcode, countrycode])
        .then((result) => {
          console.log('second post done: result POST', result.rows[0].id);
          //  pool.query(queryTextThree, [lastname, firstname, middlename, birthdate, sex, countrycode, countrycode, email, phonenumber, '2', newUserId, result.rows[0].id, result.rows[0].id])
        })
    })
   .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('error in post user route:', err);
      res.sendStatus(500);
    });
});



// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
