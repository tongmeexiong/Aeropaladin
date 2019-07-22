import React, {Component} from 'react';
import {Divider, Button, Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import EmergencyContact from '../FormInputs/EmergencyContact/EmergencyContact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

/**
 * This form allows you to update an existing crew member.
 * It is designed to take in a prop of the current crew member to edit.
 * This could be merged with the add new crew form but in the scope of our 2 week
 * project it was not feasible.
 */
class CrewUpdateForm extends Component{
    state = {
        crew: this.props.crew,
        travelDocumentOne: this.props.travelDocumentOne,
        travelDocumentTwo: this.props.travelDocumentTwo,
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW_EMERGENCY_CONTACT', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW_DOCUMENT_ONE', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW_DOCUMENT_TWO', payload: this.props.match.params.id })     
    }

    /**
     * This will check to see if the props and state are the same...if not it will
     * set the state to the prop passed in. This is used to update the state and set
     * the default value of the form inputs (for edit mode).
     */
    componentDidUpdate(){
        if(!Object.keys(this.state.crew).length || Array.isArray(this.state.crew)){
            console.log('checking crew for length');
            if(this.state.crew !== this.props.crew[0]){                
                this.setState({
                    ...this.state,
                    crew: this.props.crew[0]
                })
            }
        }
        if(!Object.keys(this.state.travelDocumentOne).length){
            if(this.state.travelDocumentOne !== this.props.travelDocumentOne){
                this.setState({
                    ...this.state,
                    travelDocumentOne: this.props.travelDocumentOne
                })
            }
        }
        if (!Object.keys(this.state.travelDocumentTwo).length) {
            if (this.state.travelDocumentTwo !== this.props.travelDocumentTwo) {
                this.setState({
                    ...this.state,
                    travelDocumentTwo: this.props.travelDocumentTwo
                })
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('doing a submitto');
        this.props.dispatch({type: 'UPDATE_CREW', payload: this.state});
    }

    handleCancel = () => {
        this.props.history.push('/crewinfo');
    }

    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })

    }

    render() {        
        return(
            <div>
                <h1>Edit Crew</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Crew Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" person={this.props.crew[0]}/>
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="crew" person={this.props.crew[0]}/>
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="crew" person={this.props.crew[0]}/>
                    <Divider />
                    <EmergencyContact handleChange={this.handleChange} stateType="emergencyContact" person={this.props.emergencyContact}/>
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" travelDocument={this.props.travelDocumentOne}/>
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" travelDocument={this.props.travelDocumentTwo}/>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    onClick={this.handleCancel}
                                    secondary
                                    className="formButton"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                                    primary
                                    className="formButton"
                                >
                                    Edit Crew
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
        crew: reduxState.crewReducer,
        travelDocumentOne: reduxState.documentOneReducer,
        travelDocumentTwo: reduxState.documentTwoReducer,
        emergencyContact: reduxState.emergencyContactReducer,
    }
}

export default connect(mapStateToProps)(CrewUpdateForm);