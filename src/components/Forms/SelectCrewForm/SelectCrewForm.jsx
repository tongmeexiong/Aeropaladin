import React, {Component} from 'react';
import {Select, Grid, Label, Button} from 'semantic-ui-react'
import {connect} from 'react-redux';

import '../../FormInputs/FormInputs.css'

let options = []

/**
 * This class goes into the create new apis form and allows the user to select a crew member
 * for a given APIS
 */
class SelectCrewForm extends Component{

    state = {
        crewId: ''
    }

    //grab all crew when component mounts.
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_CREW'});        
    }

    //semantic UI requires us to capture changes this way.
    onSelectChange = (event, { name, value}) => {        
        let crewObj = options[value];
        crewObj = {
            ...crewObj,
            selection: value
        }        
        this.setState(crewObj);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit", this.state);
        this.props.dispatch({type: 'SET_APIS_CREW', payload:this.state})
        this.props.nextStep();
    }

    getCrews = () => {
        options = []
        let selectOptions = []
        for(let i = 0; i < this.props.crews.length; i++){
            let crew = this.props.crews[i];
            options.push(crew);
            selectOptions.push(
                {key: i, value: i, text: `${crew.firstname} ${crew.lastname}`}
            )
        }
        
        return selectOptions;            
    }

    render(){        
        return(

            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2 className="travelDocHead">Crew</h2>
                    <Label className="formInputLabel">
                        <Select className="formAltInput"
                            defaultValue={(this.props.apisCrew) ? this.props.apisCrew.selection : ''}
                            placeholder="select your crew"
                            name="crew"
                            options={this.getCrews()}
                            onChange={this.onSelectChange}
                        />
                        <span>
                            Choose Crew
                    </span>
                    </Label>

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
    return{
        crews: reduxState.crewReducer,
        apisCrew: reduxState.apisReducer.crew
    }
}

export default connect(mapStateToProps)(SelectCrewForm);