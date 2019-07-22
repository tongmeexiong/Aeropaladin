import React, {Component} from 'react';
import {Select, Grid, Label, Button, Dropdown} from 'semantic-ui-react'
import {connect} from 'react-redux';

import '../../FormInputs/FormInputs.css'


let options = [];

/**
 * This component displays a form that allows the user
 * to select the aircraft they're using for their 
 * currently filing APIS
 */
class SelectAircraftForm extends Component{

    state = {        
        id: '',
        tailnumber: '',
        typeaircraft: '',
        color: '',
        callsign: '',
        cbpdecalnbr: '',
        operator_id: '',
        operator_lastname: '',
        operator_firstname: '',
        owner_id: '',
        owner_firstname: '',
        owner_lastname: '',
        selection: 0,

    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_AIRCRAFT'});        
    }

    //this function takes the selected value from our
    //drop down and sets local state to the value of said selection
    onSelectChange = (event, { name, value}) => {        
        let aircraftObj = options[value]        
        aircraftObj = {
            ...aircraftObj,
            selection: value
        }        
        this.setState(aircraftObj);        
    }

    //this will send our aircraft to our APIS reducer which stores our
    //in progress APIS form information. It also switches to the next step.
    handleSubmit = (event) => {
        event.preventDefault();        
        this.props.dispatch({type: 'SET_APIS_AIRCRAFT', payload:this.state})        
        this.props.nextStep();

    }

    //This will get all aircrafts assigned to the logged in user
    //and assign it to props.
    getAircrafts = () => {
        options = []
        let selectOptions = []
        for(let i = 0; i < this.props.aircrafts.length; i++){
            let aircraft = this.props.aircrafts[i]            
            options.push(aircraft);
            selectOptions.push(
                {key:aircraft.id, value: i, text: `${aircraft.typeaircraft} ${aircraft.callsign}`}
            )
        }        
        return selectOptions;
    }

    render(){        
        return(
            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2 className="apisDocHead">Aircraft</h2>
                    <Label className="formInputLabel">                        
                        <Select className="formAltInput"
                            defaultValue={(Object.keys(this.props.apisAircraft).length) ? this.props.apisAircraft.selection : ''}
                            placeholder="select your aircraft"
                            name="aircraft"
                            options={this.getAircrafts()}
                            onChange={this.onSelectChange}
                        />
                        <span>
                            Choose Aircraft
                    </span>
                    </Label>

                    <div className="formButtons">
                        <Grid columns='equal'>                            
                                <Grid.Column width={12}></Grid.Column>
                                <Grid.Column width={3}>
                                    <Button
                                        type="submit"
                                        
                                        className="ui green button formButton"
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
    return{
        aircrafts: reduxState.aircraftReducer,
        apis: reduxState.apisReducer,
        apisAircraft: reduxState.apisReducer.aircraft,
    }
}

export default connect(mapStateToProps)(SelectAircraftForm);