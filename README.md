# AeroPaladin
AeroPaladin is a full-stack application that helps general aviation pilots file the necessary flight permission documentation, an APIS (Advance Passenger Information System) when traveling internationally. This application gives the pilot the ability to collect and save all their flight data such as Crew Members, Aircraft Details, Passengers and Itinerary Information. The data can then be used to fill out future APIS documents.

## Built With
* HTML
* CSS
* JavaScript
* Axios
* Bcrypt
* Cookie-session
* Dotenv
* Express
* Nodemon
* Passport
* Passport-local
* Pg
* React/Redux/Saga
* Semantic-UI
* Moment.js

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico](https://eggerapps.at/postico/)
- [Postman](https://www.getpostman.com/)
- [IDE - Virtual Studio Code Recommended](https://code.visualstudio.com/)
- [Heroku - Create Account](https://www.heroku.com/)

## Installing

1. Download this project via zip
2. Create a repository on github for this project
3. Open downloaded zip of project in your IDE
4. Follow the instructions outlined on Github for ... or create a new repository on the command line (these immediately follow    the creation of a new repository)
5. Create database in Postico with database name of 'aeropaladin'
6. Insert sql-text from database.sql file located in project root into database sql-query in Postico
7. Execute sql queries to create tables
8. In terminal, start postgres server (this will start 'aeropalaldin' database)
9. Start postgres if not running already by using `brew services start postgresql`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Deploying

1. Install Heroku CLI by typing `brew install heroku` in Terminal
2. Authenticate by typing `heroku login` in Terminal
3. In terminal, navigate to your project folder and type `heroku create`
4. In terminal, type `git remote -v` to ensure it added successfully
5. In terminal, type `git push heroku master`
6. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project
7. In terminal, type `heroku pg:push aeropaladin DATABASE_URL` to copy your database contents up to Heroku.
8. If changes are made within the IDE and you want them reflected on Heroku following the following prompts:
  * `git add .`
  * `git commit -m "MESSAGE"`
  * `git push heroku master`

## Screenshot

![image](https://user-images.githubusercontent.com/47267211/61001536-6ed3c300-a325-11e9-9564-1e0497fc7631.png)

## Completed Features

- [x] Authentication with multiple roles
- [x] Routes based on authentication
- [x] Register User
- [x] view APIS Trips on Home page(Pending APIS, Submitted APIS, Historic APIS)
- [x] view User Information, crew Information, Passenger Information, Aircraft Information
- [x] Add new Crew member, add new passengers and add new Aircraft.
- [x] Edit crew member, passengers and aircraft.
- [x] Create new APIS 
- [x] Select Aircraft, Select Passenger, Select crew to create an APIS.
- [x] create Flight segment One, Flight Segment Two for the inbound and outbound Information for creating the APIS.
- [x] Review Apis to review the APIS and edit the APIS before submitting.
- [x] Generate XML Document

### Next Steps

- [ ] Edit Home page Review APIS
- [ ] Edit Review Apis via dashboard edit aircraft, edit Manifest, edit flight segment one, edit flight segment two.



## Authors

Stefen Menzel, Heena Kouser, Tony Xiong and Maddie Morton




