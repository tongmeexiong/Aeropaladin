import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'


class PassengerList extends Component {
    render () {
        console.log('passenger list in passenger list:', this.props.passengers);
        return (
          <>
          <ul>
              {this.props.passengers.map(passenger => {
               return (
                    <li className="paxPersonLI" key={passenger.id}>
                        {passenger.firstname} {passenger.lastname} 
                        <button 
                            style={{backgroundColor:'transparent', borderStyle:"none", color:'white' }} 
                            type="button" 
                            onClick={(e) => this.props.removePassenger(passenger.selection)}
                        >
                            <Icon name="trash alternate outline" />
                        </button>
                    </li>
               )
              })}
              
            </ul> 
         </>
        )
    }
}

export default PassengerList
