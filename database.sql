--DATABASE NAME "aeropaladin"

--user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE NOT NULL,
    "firstname" VARCHAR (20),
    "lastname" VARCHAR (25),
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (70),
    "phonenumber" VARCHAR(25)
);


--Address Table
CREATE TABLE "address" (
     "id" SERIAL PRIMARY KEY,
     "streetaddr" VARCHAR(35),
     "city" VARCHAR (35),
     "state" VARCHAR (2),
     "postalcode" VARCHAR(9), 
     "countrycode" VARCHAR(10)
);

--Airport Table
CREATE TABLE "airport" (
    "id" SERIAL PRIMARY KEY,
    "airportcode" VARCHAR(6),
    "city" VARCHAR(30),
    "cntrycode" VARCHAR(3),
    "state" VARCHAR(2),
    "description" VARCHAR(75) 
);


--People table
CREATE TABLE "people" (
    "id" SERIAL PRIMARY KEY,
    "lastname" VARCHAR (25)  NOT NULL,
    "firstname" VARCHAR (20) NOT NULL,
    "middlename" VARCHAR (20),
    "birthdate" DATE,
    "sex" VARCHAR (1),
    "residencecntry" VARCHAR(3),
    "citizenshipcntry" VARCHAR(3),
    "emailaddr" VARCHAR(70),
    "telephonenbr" VARCHAR(25),
    "peopletype" INTEGER,
    "user_id" INT REFERENCES "user",
    "permanentaddress_id" INT REFERENCES "address",
    "addresswhileinus_id" INT REFERENCES "address",
    "active" BOOLEAN DEFAULT TRUE
);

--Document Table
CREATE TABLE "document" (
    "id" SERIAL PRIMARY KEY,
    "doccode" VARCHAR(3),
    "documentnbr" VARCHAR(20),
    "expirydate" DATE,
    "cntrycode" VARCHAR(3),
    "people_id" INT REFERENCES "people"
);

--EmergencyContacts Table
CREATE TABLE "emergencycontacts" (
    "id" SERIAL PRIMARY KEY,
    "lastname" VARCHAR (25)  NOT NULL,
    "firstname" VARCHAR (20) NOT NULL,
    "middlename" VARCHAR (20),
    "telephonenbr" VARCHAR(25),
    "emailaddr" VARCHAR(70) 
);

--Aircraft Table
CREATE TABLE "aircraft" (
    "id" SERIAL PRIMARY KEY,
    "tailnumber" VARCHAR(8),
    "typeaircraft" VARCHAR(30),
    "color" VARCHAR(30),
    "callsign" VARCHAR(30),
    "cbpdecalnbr" VARCHAR(8),
    "owner_id" INT REFERENCES "people",
    "operator_id" INT REFERENCES "people",
    "active" BOOLEAN DEFAULT TRUE
);

--Itinerary Table
CREATE TABLE "itinerary" (
   "id" SERIAL PRIMARY KEY,
   "departure_airport_id" INT REFERENCES "airport",
   "localdeparturetimeStamp" TIMESTAMP,
   "inboundarrivalLocation_airport_id" INT REFERENCES "airport",
   "localarrivaltimestamp" TIMESTAMP
);


--Flight Table
CREATE TABLE "flight" (
    "id" SERIAL PRIMARY KEY,
    "emergencycontact_id" INT REFERENCES "emergencycontacts",
    "itinerary_id" INT REFERENCES "itinerary",
    "aircraft_id" INT REFERENCES "aircraft",
    "operator_id" INT REFERENCES "people",
    "owner_id" INT REFERENCES "people",
    "flight_status" INT DEFAULT 2
);

--User_Itinerary Junction Table
CREATE TABLE "user_itinerary" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "itinerary_id" INT REFERENCES "itinerary"
);   

--Flight_People Junction Table
CREATE TABLE "flight_people" (
    "id" SERIAL PRIMARY KEY,
    "flight_id" INT REFERENCES "flight",
    "people_id" INT REFERENCES "people"
    
);
   

--People_EmergencyContacts JUNCTION Table
CREATE TABLE "people_emergencycontacts" (
     "id" SERIAL PRIMARY KEY,
     "people_id" INT REFERENCES "people",
     "emergencycontact_id" INT REFERENCES "emergencycontacts"
);



