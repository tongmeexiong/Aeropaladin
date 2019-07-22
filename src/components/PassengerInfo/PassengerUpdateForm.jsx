import React, { Component } from 'react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

/**
 * This is our PassengerUpdateForm...It looks/works similarly to the add passenger form
 * but is designed to auto-populate data. This could be condensed into one passenger form
 * but we didn't have time in the two weeks we worked on this project.
 */
class PassengerUpdateForm extends Component {
    
    //stash changes in local state....also stash initial values
    //for inputs.
    state = {
        passenger: {},
        travelDocumentOne: this.props.travelDocumentOne,
        travelDocumentTwo: this.props.travelDocumentTwo,
    }

 
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER_DOCUMENT_ONE', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER_DOCUMENT_TWO', payload: this.props.match.params.id }) 
    }
    
    /**
        this runs every time the component updated E.G. props have changed.
        this bit of code checks to make sure that the local state (where the inputs get their values)
        is the same as the props passed in (what we want to set the values to)
        we do this check because componentDidUpdate will run every time the state/props change
        so if we update the local state every time it isn't the same as the props we'll have an
        infinite loop.
     *   
     * */
    componentDidUpdate() {
        if (!Object.keys(this.state.passenger).length || Array.isArray(this.state.passenger)) {
            if (this.state.passenger !== this.props.passenger[0]) {
                this.setState({
                    ...this.state,
                    passenger: this.props.passenger[0]
                })
            }
        }

        if (!Object.keys(this.state.travelDocumentOne).length) {
            if (this.state.travelDocumentOne !== this.props.travelDocumentOne) {
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
        this.props.dispatch({type: 'UPDATE_PASSENGER', payload:this.state});
        this.props.history.push('/passengerinfo');
    }

    handleCancel = () => {
        this.props.history.push('/passengerinfo');
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
                <h1>Edit Passenger</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Passenger Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="passenger" person={this.props.passenger[0]} />
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="passenger" person={this.props.passenger[0]} />
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="passenger" person={this.props.passenger[0]} />
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" travelDocument={this.props.travelDocumentOne} />
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" travelDocument={this.props.travelDocumentTwo} />

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
                                    Edit Passenger
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
        reduxState: reduxState,
        passenger: reduxState.passengerReducer,
        travelDocumentOne: reduxState.documentOneReducer,
        travelDocumentTwo: reduxState.documentTwoReducer,
    }
}

export default connect(mapStateToProps)(PassengerUpdateForm);