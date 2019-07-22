import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Label, Select, Checkbox } from 'semantic-ui-react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import '../FormInputs.css';


class FlightSegment extends Component {        

    /**
     * Storing current values in local state...also setting
     * values of the form inputs so that we can display current
     * values in edits.
     */
    state = {
        departure : {
         
        },
        arrival : {

        },
        arrivalairport: '',
        departureairport: '',
        arrivaldate: '',
        departuredate: '',
        arrivaltime: '',
        departuretime: '',  
        arrivalcity: '',
        arrivalstate: '',
        arrivalcountry: '',
        arrivaldescription: '',
        departurecity: '',
        departurestate: '',
        departurecountry: '',
        departuredescription: ''      
    }
    
    //runs every time this component mounts -> state updates, props updates what have you.
    componentDidMount(){        
        if (Object.keys(this.props.apisReducer[this.props.stateType]).length){            
            if (this.state.departure !== this.props.apisReducer[this.props.stateType].departure) {
                this.setState({
                    ...this.state,
                    departure: this.props.apisReducer[this.props.stateType].departure,
                    arrival: this.props.apisReducer[this.props.stateType].arrival
                })
            }
        }            
    }

    //This determines which SAGA dispatch to send the data to using state type.
    segmentOneOrTwo = () => {
        return ((this.props.stateType === 'flightSegmentOne') ? 'SET_APIS_FLIGHT_SEGMENT_ONE' : 'SET_APIS_FLIGHT_SEGMENT_TWO')
    }


    //On submit, create an object from the departure and arrival to send out.
    //Send data out to the SAGA.
    //also reset state to empty values.
    handleSubmit = (event) => {
        event.preventDefault();        
        let objToSend = {
            departure: this.state.departure,
            arrival: this.state.arrival,
        }
        this.props.dispatch({ type: this.segmentOneOrTwo(), payload: objToSend})

        this.setState({
            departure: {},
            arrival: {},                        

            departureairport: '',
            departurecity: '',
            departurestate:'',
            departurecountry:'',
            departuredescription: '',
            departuredate: '',
            departuretime: '',

            arrivalairport: '',            
            arrivalcity:'',
            arrivalstate:'',
            arrivalcountry:'',
            arrivaldescription: '',
            arrivaldate: '',
            arrivaltime: '',
        })
        this.props.nextStep();
        window.scrollTo(0, 0)

    }

    //go back to the previous page in the create new apis process.
    handlePrevious = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }

    //this takes in a change event.
    //this is specific to the way semantic UI does change events.
    //We then set state with this new data.
    onTimeChange = (event, { name, value }, segmentType) => {        
        //nothing to see here. move along
        this.setState({
            ...this.state,
            [segmentType+name]: value,
            [segmentType]: {
                ...this.state[segmentType],
                [name]: value
            }            
        })        
    }

    //this is our normal handlechange function, it works similarly to the
    //semantic UI way but with slightly different passed values.
    handleChange = (propertyToChange, newProperty, event) => {        

        this.setState({
            ...this.state,
            [propertyToChange+newProperty]: event.target.value,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
    }
    

    render() {        
        return (
            <div className="formInputs">                
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2 className="travelDocHead">Flight Segment</h2>
                    <h3 className="travelDocHead">Departure</h3>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('departure', "airport", e)}
                            placeholder="Airport"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ? 
                                this.props.apisReducer[this.props.stateType].departure.airport : 
                                this.state.departureairport
                            }
                        />
                        <span>
                            Airport Code
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('departure', "city", e)}
                            placeholder="Airport city"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].departure.city :
                                this.state.departurecity}
                        />
                        <span>
                            Airport City
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('departure', "state", e)}
                            placeholder="Airport state"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].departure.state :
                                this.state.departurestate}
                        />
                        <span>
                            Airport State
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('departure', "country", e)}
                            placeholder="Airport country"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].departure.country :
                                this.state.departurecountry}
                        />
                        <span>
                            Airport country code
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('departure', "description", e)}
                            placeholder="Airport description"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].departure.description :
                                this.state.departuredescription}
                        />
                        <span>
                            Airport description
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <TimeInput className="formAltInput"
                            name="time"
                            // value={
                            //     (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                            //     this.props.apisReducer[this.props.stateType].departure.time :
                            //     this.state.departuretime}
                            value={this.state.departure.time}
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, {name, value}, 'departure')}
                            placeholder="Estimated Time of Departure"
                            style={{ width: '100%' }}
                        />
                        <span>
                            Estimated Time
                        </span>
                    </Label>
                    {/* <Label className="formInputLabel">
                    <Input className="formInput"
                            onChange={this.handleDepartureChange("time_zone")}
                            placeholder="Time Zone"
                        />
                        <span>
                            Time Zone
                        </span>
                    </Label> */}
                    <Label className="formInputLabel">
                        <DateInput className="formAltInput"
                            name="date"
                            // value={
                            //     (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                            //     this.props.apisReducer[this.props.stateType].departure.date :
                            //     this.state.departuredate}
                            value={this.state.departure.date}
                            placeholder="Estimated Departure Date"
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, { name, value }, 'departure')}
                            style={{ width: '100%' }}
                            dateFormat="YYYY-MM-DD"
                        />
                        <span>
                            Estimated Departure Date
                        </span>
                    </Label>

                    <Divider />

                    <h3 className="travelDocHead">Arrival</h3>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('arrival', "airport", e)}
                            placeholder="Airport"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                    this.props.apisReducer[this.props.stateType].arrival.airport :
                                    this.state.arrivalairport}
                        />
                        <span>
                            Airport
                        </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('arrival', "city", e)}
                            placeholder="Airport city"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].arrival.city :
                                this.state.arrivalcity}
                        />
                        <span>
                            Airport City
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('arrival', "state", e)}
                            placeholder="Airport state"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].arrival.state :
                                this.state.arrivalstate}
                        />
                        <span>
                            Airport State
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('arrival', "country", e)}
                            placeholder="Airport country"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].arrival.country :
                                this.state.arrivalcountry}
                        />
                        <span>
                            Airport country code
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('arrival', "description", e)}
                            placeholder="Airport description"
                            defaultValue={
                                (Object.keys(this.props.apisReducer[this.props.stateType]).length) ?
                                this.props.apisReducer[this.props.stateType].arrival.description :
                                this.state.arrivaldescription}
                        />
                        <span>
                            Airport description
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                    <TimeInput className="formAltInput"
                            name="time"                            
                            value={this.state.arrival.time}
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, { name, value }, 'arrival')}
                            placeholder="Estimated Time of Arrival"
                            style={{ width: '100%' }}
                        />
                        <span>
                            Estimated Time
                        </span>
                    </Label>                    
                    <Label className="formInputLabel">
                        <DateInput className="formAltInput"
                            name="date"                            
                            value={this.state.arrival.date}
                            placeholder="Estimated Arrival Date"
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, { name, value }, 'arrival')}
                            style={{ width: '100%' }}
                            dateFormat="YYYY-MM-DD"
                        />
                        <span>
                            Estimated Arrival Date
                        </span>
                    </Label>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    onClick={this.handlePrevious}
                                    secondary
                                    className="formButton"
                                >
                                    Back
                                </Button>
                            </Grid.Column>

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
        apisReducer: reduxState.apisReducer
    }
}

export default connect(mapStateToProps)(FlightSegment);
