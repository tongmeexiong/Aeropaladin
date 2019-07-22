import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react'
import './ReviewApis.css';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';


/**
 * This class shows the review page for create new apis.
 * This displays all the information you've alread selected
 * and allows you to go back and edit all the information you 
 * just added to the review page.
 */
class ReviewApis extends Component {

    //goes back to the create new apis aircraft selection page
    editAircraft = () => {        
        this.props.history.push(`/apis/${1}`)
        this.props.editStep(1)
    }

    //goes back to the create new apis crew selection page
    editCrew = () => {        
        this.props.history.push(`/apis/${2}`)
        this.props.editStep(2)

    }

    //goes back to the create new apis passenger selection page
    editPassenger = () => {        
        this.props.history.push(`/apis/${3}`)
        this.props.editStep(3)

    }

    //goes back to the create new apis flight segment one page
    editFlightSegementOne = () => {        
        this.props.history.push(`/apis/${4}`)
        this.props.editStep(4)
        window.scrollTo(0, 0)
    }

    //goes back to the create new apis flight segment two page
    editFlightSegementTwo = () => {        
        this.props.history.push(`/apis/${5}`)
        this.props.editStep(5)
        window.scrollTo(0, 0)

    }

    handleSubmit = (event) => {
        event.preventDefault();        
        this.props.dispatch({ type: 'ADD_APIS', payload: this.props.reviewApis })
        this.props.history.push("/home")
        Swal.fire({
            type: 'success',
            title: 'APIS Saved!',
            timer: 1500
        })
        
    }
    render() {        
        return (
            <>
                <div>
                    <h2 className="ui header middle aligned center aligned grid">Review APIS</h2>
                </div>
                <div style={{display: "block", margin: "auto"}} className="ui segments middle aligned center aligned grid review div big">
                    <List>
                        {/* Aircraft Information */}

                        <List.Item className="listItem">
                            <div className="subHeadBtn">
                                <List.Header>AirCraft</List.Header>
                                <Button className="ui icon button editBtn" onClick={this.editAircraft}><i className="edit icon"></i></Button>
                            </div>
                            <br />
                            <br />
                            Tail Number: {this.props.reviewApis.aircraft.tailnumber}
                            <br />
                            <br />
                            Owner: {this.props.reviewApis.aircraft.owner_firstname} {this.props.reviewApis.aircraft.owner_lastname}
                            <br />
                            <br />
                            Company/Person Operator: {this.props.reviewApis.aircraft.operator_firstname} {this.props.reviewApis.aircraft.operator_lastname}
                        </List.Item>

                        <List.Item className="listItem">
                            <div className="subHead">
                                <List.Header>Manifest</List.Header>
                                <br />
                                Crew
                                    <Button className="ui icon button editBtn" onClick={this.editCrew}><i className="edit icon"></i></Button>
                                <ul>
                                    <li> {this.props.reviewApis.crew.firstname} {this.props.reviewApis.crew.lastname} </li>
                                </ul>
                            </div>
                        </List.Item>

                        <List.Item className="listItem">
                            <div className="subHead">
                                
                                Passengers
                                     <Button className="ui icon button editBtn" onClick={this.editPassenger}><i className="edit icon"></i></Button>
                                <ul>
                                    {this.props.reviewApis.passenger.map(p => {

                                        return <>
                                            <li key={p.id}>{p.firstname} {p.lastname}</li>
                                             <br/>
                                              </>
                                    })}
                                </ul>
                            </div>
                        </List.Item>
                        {/* flight segment one */}

        <List.Item className="listItem">
         <h3>Flight Segment One</h3>
         
         {/* <Button className="ui mini green button" onClick={this.edit}>Edit Section</Button> */}
            <Button className="ui icon button editBtn" onClick={this.editFlightSegementOne}><i className="edit icon"></i></Button>
         <br/>
        <h4 className="departuresubhead">Departure</h4> 
         <br/>
            <br/>
             Departure Airport: {this.props.reviewApis.flightSegmentOne.departure.airport}
            <br/>
            Departure Airport City: {this.props.reviewApis.flightSegmentOne.departure.city}
            <br/>
            Departure Airport State: {this.props.reviewApis.flightSegmentOne.departure.state}
            <br/>
            Departure Airport Country Code: {this.props.reviewApis.flightSegmentOne.departure.country}
            <br/>
            Departure Airport description: {this.props.reviewApis.flightSegmentOne.departure.description}
            <br/>
             Departure Time: {this.props.reviewApis.flightSegmentOne.departure.time} 
            <br/>
             Departure Date: {this.props.reviewApis.flightSegmentOne.departure.date} 
             <br/>
             <br/>
             <h4 className="arrivalsubhead">Arrival</h4>
             <br/>
            <br/>
             Arrival Airport: {this.props.reviewApis.flightSegmentOne.arrival.airport}
             <br/>
            Arrival Airport City: {this.props.reviewApis.flightSegmentOne.arrival.city}
            <br/>
            Arrival Airport State: {this.props.reviewApis.flightSegmentOne.arrival.state}
            <br/>
            Arrival Airport Country Code: {this.props.reviewApis.flightSegmentOne.arrival.country}
            <br/>
            Arrival Airport Description: {this.props.reviewApis.flightSegmentOne.arrival.description}
            <br/>
             Arrival Time: {this.props.reviewApis.flightSegmentOne.arrival.time} 
            <br/>
             Arrival Date: {this.props.reviewApis.flightSegmentOne.arrival.date}
        </List.Item>
             {/* flight segment Two */}
        <List.Item className="listItem">
            <h3>Flight Segment Two</h3>
         
         {/* <Button className="ui mini green button" onClick={this.edit}>Edit Section</Button> */}
            <Button className="ui icon button editBtn" onClick={this.editFlightSegementTwo}><i className="edit icon"></i></Button>
         <br/>
         <h4 className="departuresubhead">Departure</h4> 
         <br/>
            <br/>
             Departure Airport: {this.props.reviewApis.flightSegmentTwo.departure.airport}
            <br/>
            Departure Airport City: {this.props.reviewApis.flightSegmentTwo.departure.city}
            <br/>
            Departure Airport State: {this.props.reviewApis.flightSegmentTwo.departure.state}
            <br/>
            Departure Airport Country Code: {this.props.reviewApis.flightSegmentTwo.departure.country}
            <br/>
            Departure Airport Description: {this.props.reviewApis.flightSegmentTwo.departure.description}
            <br/>
             Departure Time: {this.props.reviewApis.flightSegmentTwo.departure.time} 
            <br/>
             Departure Date: {this.props.reviewApis.flightSegmentTwo.departure.date} 
             <br/>
             <br/>
                            <h4 className="arrivalsubhead"> Arrival</h4>
             <br/>
            <br/>
             Arrival Airport: {this.props.reviewApis.flightSegmentTwo.arrival.airport}
             <br/>
            Arrival Airport City: {this.props.reviewApis.flightSegmentTwo.arrival.city}
            <br/>
            Arrival Airport State: {this.props.reviewApis.flightSegmentTwo.arrival.state}
            <br/>
            Arrival Airport Country Code: {this.props.reviewApis.flightSegmentTwo.arrival.country}
            <br/>
            Arrival Airport description: {this.props.reviewApis.flightSegmentTwo.arrival.description}
            <br/>
             Arrival Time: {this.props.reviewApis.flightSegmentTwo.arrival.time} 
            <br/>
             Arrival Date: {this.props.reviewApis.flightSegmentTwo.arrival.date}
        </List.Item>

                    </List>
                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={12}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    
                                    className="ui medium button green formButton"
                                    onClick={this.handleSubmit}
                                >
                                    Submit APIS
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>

            </>

        )
    }
}

const mapStateToProps = (reduxState) => ({
    reviewApis: reduxState.apisReducer
});

export default connect(mapStateToProps)(withRouter((ReviewApis)));