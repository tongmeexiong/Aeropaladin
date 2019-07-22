import React, { Component } from 'react';
import { Select, Grid, Label, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PassengerList from './PassengerList';

import '../../FormInputs/FormInputs.css'

let options = []


/**
 * This class goes on the create new APIS form and allows the 
 * user to select 1-x passengers to go on their flight.
 */
class SelectPassengerForm extends Component {

    state = {
        currentPassenger: {},
        passengers:[
            
         ],
        
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PASSENGER' });        
    }

    //this was the original way we were taking in a passenger selection
    //we would take this in then there was an ADD button to add said passenger.
    //we have since switched to just adding the passenger when selected.
    onSelectChange = (event, { name, value}) => {
        let passengerObj = options[value];                
        this.setState({
          ...this.state,
          currentPassenger: passengerObj        
        });
    }
    
    //this will add a passenger only if the passenger hasn't already been added.
    addPassenger = (event, { name, value }) => {
        let passengerObj = options[value];
        passengerObj = {
            ...passengerObj,
            selection: this.state.passengers.length,
        }

        for(let i = 0; i < this.state.passengers.length; i++){
            if(this.state.passengers[i].id === passengerObj.id){
                return;
            }
        }                        
        this.setState({
            ...this.state,
            passengers: [
                ...this.state.passengers,                
                passengerObj
            ]
        })

    }

    //this function allows you to remove a passenger from the tentative
    //passenger list that will eventually be added to the reducer and eventually
    //the database.
    removePassenger = (passengerIndex) => {                
        let newPassengerList = this.state.passengers;
        newPassengerList.splice(passengerIndex, 1);
        this.setState({
            ...this.state,
            passengers: newPassengerList,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();        
        this.props.dispatch({ type: 'SET_APIS_PASSENGER', payload: this.state.passengers })
        this.props.nextStep();
    }

    //this takes all the passengers in from props and adds them to the drop down menu.
    getPassenger = () => {
        options = []
        let selectOptions = []
        for(let i = 0; i < this.props.passengers.length; i++){
            let passenger = this.props.passengers[i];
            options.push(passenger);
            selectOptions.push(
                {key: i, value: i, text: `${passenger.firstname} ${passenger.lastname}`}
            )
        }
        
        return selectOptions;            
    }
    
    

    render(){        
        return(

            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2 className="travelDocHead">Passengers</h2>
                    <Label className="formInputLabel">
                        <Select className="formAltInput"
                            value={this.state.passengerValue}
                            placeholder="select your passenger"
                            name="passenger"
                            options={this.getPassenger()}
                            onChange={this.addPassenger}
                        />
                        <span>
                            Choose Passenger
                    </span>
                    </Label>                    
                    <div>
                   <PassengerList removePassenger={this.removePassenger} passengers={(this.props.apisPassengers.length) ? this.props.apisPassengers : this.state.passengers}/>
               </div>
                    <div className="formButtons">
                        <Grid columns='equal'>                            
                                <Grid.Column width={12}></Grid.Column>
                                <Grid.Column width={3}>
                                    <Button
                                        type="submit"
                                        className="ui medium button green formButton"
                                    >
                                        Next
                                </Button>
                                </Grid.Column>                                                     
                        </Grid>
                    </div>
                </form>
              
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        passengers: reduxState.passengerReducer,
        apisPassengers: reduxState.apisReducer.passenger
    }
}

export default connect(mapStateToProps)(SelectPassengerForm);