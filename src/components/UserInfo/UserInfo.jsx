import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import './UserInfo.css'

class UserInfo extends Component {

    // Send user to crew information view. 
    handleCrewPage = () => {
        this.props.history.push("/crewinfo")
    }
    // Send user to passenger information view. 
    handlePassengerPage = () => {
        this.props.history.push("/passengerinfo")
    }

    // Send user to aircraft information view. 
    handleAircraftPage = () => {
        this.props.history.push("/aircraftinfo")
    }

    render() {
        return (
            <div className="ui centered card grid">
                <div className="content">
                <div className="header One">
                    User Information
                </div>
                </div>
                <div className="content">
                    <p className="ui bold sub header"> User Name:</p> <p className="ui normal feed">{this.props.user.username}</p>
                    <br/>
                    <p className="ui sub header"> First Name: </p> <p> {this.props.user.firstname}</p>
                    <br/>
                    <p className="ui sub header"> Last Name: </p> <p> {this.props.user.lastname}</p>
                    <br/>
                    <p className="ui sub header"> Email: </p> <p> {this.props.user.email}</p>
                    <br/>
                    <p className="ui sub header"> Phone Number:</p> <p>{this.props.user.phonenumber}</p>
                </div>
            <div className= "content userButtons">
                <div>
                    <Button className="ui green button" onClick={this.handleCrewPage}>Crew</Button>
                </div>
                <div>
                    <Button className="ui green button" onClick={this.handlePassengerPage}>Passenger</Button>
                </div>
                <div>
                    <Button className="ui green button" onClick={this.handleAircraftPage}>Aircraft</Button>
                </div>
                </div>
            </div>
        )
    }
}

// Get access to user information from redux
const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(mapStateToProps)(UserInfo)