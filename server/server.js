
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const passengerRouter = require('./routes/passenger.router')
const aircraftRouter = require('./routes/aircraft.router');
const dashboardRouter = require('./routes/dashboard.router');
const crewRouter = require('./routes/crew.router')
const reviewRouter = require('./routes/review.router')
const xmlRouter = require('./routes/xml.router');
const apisRouter = require('./routes/apis.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/passenger', passengerRouter);
app.use('/api/crew', crewRouter);
app.use('/api/review', reviewRouter);
app.use('/api/xml', xmlRouter);
app.use('/api/apis', apisRouter);



app.use('/api/aircraft', aircraftRouter);
app.use('/api/dashboard', dashboardRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
