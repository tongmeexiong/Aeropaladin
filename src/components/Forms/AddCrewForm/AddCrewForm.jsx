import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Name from '../../FormInputs/Name/Name';
import Address from '../../FormInputs/Address/Address';
import Contact from '../../FormInputs/Contact/Contact';
import EmergencyContact from '../../FormInputs/EmergencyContact/EmergencyContact.jsx';
import TravelDocuments from '../../FormInputs/TravelDocuments/TravelDocuments';
import Swal from 'sweetalert2';


/**
 * This class takes a bunch of inputs in and wraps them in a form.
 * This particular version is used to display the AddCrewForm.
 */
class AddCrewForm extends Component {
    state = {
        
    }

    handleSubmit = (event) => {
        event.preventDefault();        
        this.props.dispatch({type: 'ADD_CREW', payload: this.state})
        this.props.history.push('/crewinfo/')
        Swal.fire({
            type: 'success',
            title: 'Crew Added!',
            timer: 1500
        })
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
        return (
            <div>
                <h1 className="ui header center aligned grid">Add Crew</h1>                
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2 className="travelDocHead">Crew Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" person={this.state.crew} />
                    <Divider/>
                    <Address handleChange={this.handleChange} stateType="crew" person={this.state.crew}/>
                    <Divider />
                    <h2 className="travelDocHead">Contact Information</h2>
                    <Contact handleChange={this.handleChange} stateType="crew" person={this.state.crew}/>
                    <Divider />
                    <EmergencyContact handleChange={this.handleChange} stateType="emergencyContact" person={this.state.emergencyContact} />
                    <Divider />
                    <h2 className="travelDocHead">Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" travelDocument={this.state.travelDocumentOne}/>
                    <h2 className="travelDocHead">Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" travelDocument={this.state.travelDocumentTwo}/>
                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    onClick={this.handleCancel}
                                    secondary
                                    className="ui medium button formButton"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                    
                                    className="ui medium button green formButton"
                                >
                                    Add Crew
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </form>
            </div>
        )   
    }
}



export default connect()(AddCrewForm);