import React, {Component} from 'react';
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
 * You must send in a "handleChange" function,
 * and a "stateType" prop. The handleChange function
 * will send the value of the input field back to the parent component form
 * and the state type will correspond to an object to create/add values to
 * in the parent components state (aircraft owner operator)
 */
class Contact extends Component{

    state = {
        person: this.props.person
    }

    render(){        
        return(
            <div className="formInputs">                
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "email", e)}
                        defaultValue={(this.props.person) && this.props.person.email}
                        placeholder="Email"
                    />
                    <span>
                        Email
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "phoneNumber", e)}
                        defaultValue={(this.props.person) && this.props.person.phoneNumber}
                        placeholder="Phone Number"
                    />
                    <span>
                        Phone Number
                    </span>
                </Label>
            </div>
        )
    }
}

export default Contact