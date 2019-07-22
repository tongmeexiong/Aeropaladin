import React, {Component} from 'react';
import {Input, Label, Select, Checkbox} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';

import '../FormInputs.css';

/**
 * This component will throw a few input fields on the DOM.
 * 
 * This component is useless without a form.
 * 
 * You must send props into this component in order for it to 
 * work properly.
 * 
 * You must send in a "handleChange" function,
 * and a "stateType" prop. The handleChange function
 * will send the value of the input field back to the parent component form
 * and the state type will correspond to an object to create/add values to
 * in the parent components state (aircraft owner operator)
 */
class Name extends Component{

    state = {
        date: '',
        citizenshipToggle: false,
        person: this.props.person
    }
    
    onDateChange = (event, {name, value}) => {        
        //nothing to see here. move along
        this.setState({
            ...this.state,
            date:value
        })
        this.props.handleChange(this.props.stateType, name, {target: {value: value}})
    }

    onSelectChange = (event, {name, value}) => {        
        if (name === 'residenceCountry'){
            this.props.handleChange(this.props.stateType, name, { target: { value: value } })            
        }
        else{
            this.props.handleChange(this.props.stateType, name, { target: { value: value } })
        }        
    }

    citizenshipCheckbox = () => {        
        this.setState({
            ...this.state,
            citizenshipToggle: !this.state.citizenshipToggle
        })
    }

    conditionalInputs = () => {
        return(
            <>
                <Label className="formInputLabel">
                    <DateInput className="formAltInput"
                        name="birthDate"
                        placeholder = "Birth Date (YYYY-MM-DD)"
                        value={this.state.date}
                        iconPosition="left"                        
                        onChange={this.onDateChange}
                        style={{width:'100%'}}
                        dateFormat="YYYY-MM-DD"
                        value={(this.props.person) && this.props.person.birthDate}
                    />
                    <span>
                        Birth Date
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <Select className="formAltInput"
                        placeholder="Select Your Sex"
                        name="sex"
                        options={[
                            {key: 'm', value:'M', text:'Male'},
                            {key: 'f', value:'F', text:'Female'}
                        ]}                        
                        onChange={this.onSelectChange}
                        value={(this.props.person) && (this.props.person.sex == "m" ? 'M' : 'F')}                        
                    />
                    <span>
                        Sex
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <Select className="formAltInput"
                        placeholder="Select Your Residence Country"
                        name="residenceCountry"
                        options={[
                            { key: 'MEX', value: 'MEX', text: 'MEX' },
                            { key: 'USA', value: 'USA', text: 'USA' }
                        ]}                        
                        onChange={this.onSelectChange}
                        value={(this.props.person) && this.props.person.residenceCountry}
                    />                    
                    <span>
                        Residence Country
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <Checkbox                         
                        onChange={this.citizenshipCheckbox}
                    />
                    <span>
                        Citizenship Country Is The Same As Residence Country
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <Select className="formAltInput"
                        placeholder="Select Your Citizenship Country"
                        name="citizenShipCountry"
                        options={[
                            { key: 'MEX', value: 'MEX', text: 'MEX' },
                            { key: 'USA', value: 'USA', text: 'USA' }
                        ]}                        
                        onChange={this.onSelectChange}
                        value={(this.props.person) && this.props.person.residenceCountry}
                        disabled={this.state.citizenshipToggle}
                    />
                    <span>
                        Citizenship Country
                    </span>
                </Label>
            </>
        )
    }

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">            
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "firstName", e)}
                        placeholder="First Name"
                        defaultValue={(this.props.person) && this.props.person.firstName}
                    />
                    <span>
                        First Name
                    </span>
                </Label>

                <Label className="formInputLabel"> 
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "middleName", e)}
                        defaultValue={(this.props.person) && this.props.person.middleName}
                        placeholder="Middle Name"
                    />
                    <span>
                        Middle Name
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "lastName", e)}
                        defaultValue={(this.props.person) && this.props.person.lastName}
                        placeholder="Last Name"
                    />
                    <span>
                        Last Name
                    </span>
                </Label>

                {(this.props.extended) && this.conditionalInputs()}
            </div>            
        )
    }
}

export default Name;