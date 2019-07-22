import React, {Component} from 'react'
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

/**
 * This component will throw a few input fields on the DOM.
 *
 * This component is useless without a form.
 *
 * You must send props into this component in order for it to
 * work properly.
 * 
 * If you'd like for this component to ask for a country code
 * you must pass in a prop called "countryCode" and set it to true
 *
 * You must send in a "handleChange" function,
 * and a "stateType" prop. The handleChange function
 * will send the value of the input field back to the parent component form
 * and the state type will correspond to an object to create/add values to
 * in the parent components state (aircraft owner operator)
 */
class Address extends Component{

    state = {
        person: this.props.person,
    }

    conditionalCountryCode = () => {
        return(
            <Label className="formInputLabel">
                <Input className="formInput"
                    onChange={(e) => this.props.handleChange(this.props.stateType, "countryCode", e)}
                    placeholder="Country Code"
                />
                <span>
                    Country Code
                </span>
            </Label>
        )
    }

    render(){
        return(
            <div className="formInputs">
                <h2 className="travelDocHead">Address</h2>
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "streetAddress", e)}
                        defaultValue={(this.props.person) && this.props.person.streetAddress}
                        placeholder="Street Address"
                    />
                    <span>
                        Street Address
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "city", e)}
                        defaultValue={(this.props.person) && this.props.person.city}
                        placeholder="City"
                    />
                    <span>
                        City
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "state", e)}
                        defaultValue={(this.props.person) && this.props.person.state}
                        placeholder="State"
                    />
                    <span>
                        State
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "postalCode", e)}
                        defaultValue={(this.props.person) && this.props.person.postalCode}
                        placeholder="Postal Code"
                    />
                    <span>
                        Postal Code
                    </span>
                </Label>

                {(this.props.countryCode) && 
                    this.conditionalCountryCode()
                }
            </div>
        )
    }
}

export default Address