import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { Header, Table, Button } from 'semantic-ui-react'

import './PassengerInfo.css'

// moment will change the format of date
const moment = require('moment');


class PassengerInfo extends Component {

    // GET request to get the the information for all crew members when page loads. 
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PASSENGER' })
    }

    // Send user to add passenger form. 
    addPassenger = () => {
        this.props.history.push("/addpassenger")
    }

    // Send user to form view to update passenger form. 
    handleEdit = (id) => {
        this.props.history.push(`/passengerupdate/${id}`)
    }

    // Send user back to user info view. 
    backButton = () => {
        this.props.history.push(`/userinfo/`)
    }

     // Archive passenger when button is clicked. Will change database active to false. 
    handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true,
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your Passenger has been deleted.',
                    'success'
                )
         // Remove passenger if you click yes if not it will be canncelled.
                this.props.dispatch({ type: 'DELETE_PASSENGER', payload: id })
            } else if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled!',  
                )
            }
        })
    }


    render() {

        return (
            <div>
                <button onClick={this.backButton} class="ui labeled icon button">
                    <i class="left chevron icon"></i>
                    Back
                </button>
                <div className="addPassengerBtn">
                    <Button className="ui medium button blue" onClick={this.addPassenger}>Add New Passenger</Button>
                </div>
                <div>
                    <Table className="table" celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                                <Table.HeaderCell>Birth Date</Table.HeaderCell>
                                <Table.HeaderCell>Sex</Table.HeaderCell>
                                <Table.HeaderCell>Residence Country Code</Table.HeaderCell>
                                <Table.HeaderCell>Citizenship Country Code</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Document</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {/* Loop through reduxState from mapStateToProps to get infomation on the DOM */}
                        {this.props.passenger.map(person => {
                            return (
                                <Table.Body key={person.people_id}>
                                    <Table.Row>
                                        <Table.Cell singleLine>
                                            <Header textAlign='center'>
                                                {person.firstname} {person.lastname}
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {moment(person.birthdate).format("MM/DD/YYYY")}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {person.sex}
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {person.residencecntry}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {person.citizenshipcntry}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {person.streetaddr}, {person.city}, {person.state} {person.postalcode}, {person.countrycode}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            Document#: {person.documentnbr} Expiry Date: {moment(person.expirydate).format("MM/DD/YYYY")}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => this.handleEdit(person.people_id)}><Icon name="edit" /></button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => this.handleDelete(person.people_id)}><Icon name="trash" /></button>                             
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            )
                        })}

                    </Table>
                </div>
            </div>
        )
    }
}


// Get access to passenger information from redux
const mapStateToProps = (reduxState) => {
    return {
        passenger: reduxState.passengerReducer
    }
}

export default connect(mapStateToProps)(PassengerInfo)
