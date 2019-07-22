const xmlBuilder = require('xmlbuilder');

function generateXML(currentAPIS){
    console.log('currentApis from xml generator:', currentAPIS);
    let apisItinerary = currentAPIS.itinerary;
    let apisCrew = currentAPIS.crew;
    let paxArray = currentAPIS.pax;
    /**
     * First we create a Transaction element...it's long
     ***************** TRANSACTION *******************
     */

    let emergencyContact = {
        LastName: apisCrew.emergencycontactlastname,
        FirstName: apisCrew.emergencycontactfirstname,
        MiddleName: (apisCrew.emergencycontactmiddlename != null ? apisCrew.emergencycontactmiddlename : ''),
        TelephoneNbr: apisCrew.emergencycontactphonenbr,
        EmailAddr: apisCrew.emergencycontactemail,
    }

    let itinerary = {
        InboundItinerary: {
            InboundDepartureLocation: {
                AirportCode: apisItinerary.departureairportcode,
                City: apisItinerary.departureairportcity,
                State: apisItinerary.departureairportstate,
                CountryCode: apisItinerary.departurecountrycode,
                PlaceDescription: apisItinerary.departureairportdesc
            },
            LocalDepartureDate: new Date().toLocaleDateString(apisItinerary.departuretimestamp),
            LocalDepartureTime: new Date().toLocaleTimeString(apisItinerary.departuretimestamp),
            InboundCompleteapisItinerary: {
                // ForeignAirport1: 'MSP',
                // ForeignAirport2: 'MSP',
                // ForeignAirport3: 'MSP',
                // ForeignAirport4: 'MSP',
                // ForeignAirport5: 'MSP',
            },
            InboundArrivalLocation: {
                AirportCode: apisItinerary.inboundairportcode,
                City: apisItinerary.inboundairportcity,
                State: apisItinerary.inboundairportstate,
                CountryCode: apisItinerary.inboundcountrycode,
                PlaceDescription: apisItinerary.inboundairportdesc
            },
            LocalArrivalDate: new Date().toLocaleDateString(apisItinerary.arrivaltimestamp),
            LocalArrivalTime: new Date().toLocaleTimeString(apisItinerary.arrivaltimestamp),
        }
    }

    let aircraft = {
        AircraftDetail: {
            TailNumber: apisItinerary.tailnumber,
            TypeAircraft: apisItinerary.typeaircraft,
            Color: apisItinerary.color,
            CallSign: apisItinerary.callsign,
            CBPDecalNumber: apisItinerary.cbpdecalnbr
        },
        OperatorDetail: {
            PersonOperator: {
                LastName: apisItinerary.operatorlastname,
                FirstName: apisItinerary.operatorfirstname,
                MiddleName: (apisItinerary.operatormiddlename != null ? apisItinerary.operatormiddlename : '') ,
            },
            OperatorContact: {
                StreetAddr: apisItinerary.operatorstreetaddr,
                City: apisItinerary.operatorcity,
                StateProvince: apisItinerary.operatorstate,
                ZipPostal: apisItinerary.operatorpostalcode,
                Country: apisItinerary.operatorcountrycode,
                TelephoneNbr: apisItinerary.operatortelephonenbr,
                EmailAddr: apisItinerary.operatoremail
            }
        },
        OwnerDetail: {
            PersonOwnerOrLessee: {
                LastName: apisItinerary.ownerlastname,
                FirstName: apisItinerary.ownerfirstname,
                MiddleName: (apisItinerary.ownermiddlename != null ? apisItinerary.ownermiddlename : ''),
            },
            OwnerOrLesseeContact: {
                StreetAddr: apisItinerary.ownerstreetaddr,
                City: apisItinerary.ownercity,
                StateProvice: apisItinerary.ownerstate,
                ZipPostal: apisItinerary.ownerpostalcode,
                Country: apisItinerary.ownercountrycode,
                TelephoneNbr: apisItinerary.ownertelephonenbr,
                EmailAddr: apisItinerary.owneremail
            }
        }
    }

    let transaction = {        
        FlightType: 'GA',
        SchemaVersion: '2.2',
        SenderId: 'avFinity',
        DateAssembled: 'Pickup date from computer at send',
        TimeAssembled: 'Pickup time from computer at send',
        EmergencyContact: emergencyContact,
        Itinerary: itinerary,
        Aircraft: aircraft        
    }    

    /**
     * ************** TRANSACTION ENDS HERE ***************
     */

    /**
     * ***************** This will be our Flight Manifest *************
     */

     //I'm writing this to make one example crew...it will need to have the ability to make
     //multiple crew members and passengers.

    let crew = {
        CrewDocument1: {
            DocCode: apisCrew.crewdoccode,
            DocumentNbr: apisCrew.crewdocnbr,
            ExpiryDate: apisCrew.crewdocexpirationdate,
            CntryCode: apisCrew.crewdoccountrycode
        },

        //currently the crew doc 2 isn't coming in
        //from the database...the query will have to be tweaked.

        // CrewDocument2: {
        //     DocCode: 'L',
        //     DocumentNbr: '0982097',
        //     ExpiryDate: '2024-03-30',
        //     CntryCode: 'USA'
        // },
        SurName: apisCrew.crewinfolastname,
        FirstName: apisCrew.crewinfofirstname,
        SecondName: (apisCrew.crewinfomiddlename != null ? apisCrew.crewinfomiddlename : '') ,
        Birthdate: new Date().toLocaleDateString(apisCrew.crewinfobirthdate),
        Sex: apisCrew.crewinfosex,
        ResidenceCntry: apisCrew.crewinforesidencecountry,
        CitizenshipCntry: apisCrew.crewinfocitizenshipcountry,
        PermanentAddress: {
            StreetAddr: apisCrew.streetaddr,
            City: apisCrew.city,
            StateProvince: apisCrew.state,
            ZipPostal: apisCrew.postalcode,
            Country: apisCrew.countrycode
        },
        AddressWhileInUs: {
            StreetAddr: apisCrew.streetaddr,
            City: apisCrew.city,
            State: apisCrew.state,
            ZipPostal: apisCrew.postalcode
        },
        TravelerType: 'CREW'
    }

    //currently we only support a flight with one crew and one pilot.
    //the database query needs to be tweaked to get the second document for
    //both crew and passengers...
    //******** I.E. this xml document isn't valid for submission *********
    let pax = {
        PaxDocument1: {
            DocCode: paxArray[0].doccode,
            DocumentNbr: paxArray[0].documentnbr,
            ExpiryDate: paxArray[0].expirydate,
            CntryCode: paxArray[0].cntrycode
        },

        //currently paxdocument 2 isn't coming in for all passengers.
        //The database query will have to be tweaked.

        // PaxDocument2: {
        //     DocCode: 'M',
        //     DocumentNbr: '0982097',
        //     ExpiryDate: '2024-03-30',
        //     CntryCode: 'USA'
        // },
        SurName: paxArray[0].lastname,
        FirstName: paxArray[0].firstname,
        SecondName: (paxArray[0].middlename != null ? paxArray[0].middlename : ''),
        Birthdate: paxArray[0].birthdate,
        Sex: paxArray[0].sex,
        ResidenceCntry: paxArray[0].countrycode,
        CitizenshipCntry: paxArray[0].countrycode,
        AddressWhileInUs: {
            StreetAddr: paxArray[0].streetaddr,
            City: paxArray[0].city,
            State: paxArray[0].state,
            ZipPostal: paxArray[0].postalcode
        },
    }

     let flightManifest = {        
        Crew: crew,
        Pax: pax,
     }     

     function getCrew() {
        //for each crew in currentApis, make a crew, add it to flightmanifest obj
     }

     function makePax(){
        //this would have to make a <pax> tag for each passenger.
        //js doesn't let you have multiple object keys with the same value
        //we'll have to have it just make an xml doc for one crew and one pax for now.
     }

     /**
      * ************** Flight Manifest Section ends here ********************
      */

    let Manifest = {
        Manifest:{
            Transaction: transaction,
            FlightManifest: flightManifest,
        }        
    }


    let xmlApis = xmlBuilder.create(Manifest);
    let xmlStr = xmlApis.end();
    // console.log("we here in the generator", xmlApis);
    return xmlStr;
}

module.exports = generateXML;