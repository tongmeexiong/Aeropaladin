import React, { Component } from 'react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Aircraft from '../FormInputs/Aircraft/Aircraft'
import OperatorForm from '../FormInputs/OperatorForm/OperatorForm.jsx';
import OwnerForm from '../FormInputs/OwnerForm/OwnerForm.jsx';

import '../Forms/Forms.css';

class AddAircraftForm extends Component {

    //as all the input are stored in separate components...we'll want
    //to store all the data in the same state with the parent component.
    state = {
        aircraft: this.props.aircraft,
        owner: this.props.owner,
        operator: this.props.operator,
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_AIRCRAFT', payload: this.props.match.params.id})
        this.props.dispatch({ type: 'FETCH_UPDATE_OPERATOR', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_OWNER', payload: this.props.match.params.id })
   
    }

    componentDidUpdate(){
        if(!Object.keys(this.state.aircraft).length){
            if (this.state.aircraft !== this.props.aircraft) {
                this.setState({
                    ...this.state,
                    aircraft: this.props.aircraft
                })
            }
        }
        if (!Object.keys(this.state.owner).length) {
            if (this.state.owner !== this.props.owner) {
                this.setState({
                    ...this.state,
                    owner: this.props.owner
                })
            }
        }
        if (!Object.keys(this.state.operator).length) {
            if (this.state.operator !== this.props.operator) {
                this.setState({
                    ...this.state,
                    operator: this.props.operator
                })
            }
        }
    }

    //send the aircraft we just added to the database.
    handleSubmit = (event) => {
        event.preventDefault();
        // console.log('submitting....or trying');
        // this.props.dispatch({ type: 'ADD_AIRCRAFT', payload: this.state });
        this.props.dispatch({type: 'UPDATE_AIRCRAFT', payload: this.state})
    }

    //cancel this form filling outing (go back to aircraft summary page)
    handleCancel = () => {
        // console.log('canceling');
        this.props.history.push('/aircraftinfo');
    }

    /**
     * As our state is initially blank we need to fill it out
     * from the inputs as we go. this function will setstate
     * in a way that'll add new keys to the object that the
     * inputs correspond with (aircraft, owner, operator) and
     * set their values to whatever was set in the inputs.
     */
    handleChange = (propertyToChange, newProperty, event) => {
        console.log('now changing: ' + propertyToChange + ' '+ newProperty);
        
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
    }

    render() {
        console.log("this.props.owner", this.props.owner);
        console.log("this.props.operator:", this.props.operator);
        console.log("this.props.aircraft:", this.props.aircraft);
        console.log("top level state is here!!!!!!!!!!", this.state);
        
        return (
            <div>
                <h1 className="ui header center aligned grid">Edit Aircraft</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <Aircraft aircraft={this.props.aircraft} handleChange={this.handleChange} stateType='aircraft'/>
                    <Divider />
                    <OperatorForm person={this.props.operator} handleChange={this.handleChange} />
                    <Divider />
                    <OwnerForm person={this.props.owner} handleChange={this.handleChange} />
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
                                    Save
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
        aircraft: reduxState.aircraftReducer,
        owner: reduxState.ownerReducer,
        operator: reduxState.operatorReducer,
    }
}

export default connect(mapStateToProps)(AddAircraftForm)

