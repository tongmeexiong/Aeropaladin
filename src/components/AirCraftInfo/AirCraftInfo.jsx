import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { Header, Table, Button } from 'semantic-ui-react'

import './AircraftInfo.css'


class AircraftInfo extends Component {

    // GET request to get the the information for all aircrafts when page loads. 
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_AIRCRAFT' })
    }

    // Send user to add aircraft form. 
    addCreww = () => {
        this.props.history.push("/addaircraft")
    }

    // Send user to form view to update aircradt form. 
    handleEdit = (id) => {
        this.props.history.push(`/aircraftupdate/${id}`)
    }

    // Send user back to the user info view
    backButton = () => {
        this.props.history.push(`/userinfo/`)
    }

    // Archive aircraft when button is clicked. Will change database active to false. 
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
                    'Your Aircraft has been deleted.',
                    'success'
                )
                // Remove aircraft if you click yes if not it will be canncelled
                this.props.dispatch({ type: 'DELETE_AIRCRAFT', payload: id })
            } else if (
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
                    <Button className="ui medium button blue" onClick={this.addCreww}>Add New Aircraft</Button>
                </div>
                <div>
                    <Table className="table" celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Tail Number</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Aircraft Type</Table.HeaderCell>
                                <Table.HeaderCell>Operator</Table.HeaderCell>
                                <Table.HeaderCell>Owner</Table.HeaderCell>
                                <Table.HeaderCell singleLine>CBP Decal Number</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {/* Loop through reduxState from mapStateToProps to get infomation on the DOM */}
                        {this.props.aircraft.map(plane => {
                            return (
                                <Table.Body key={plane.id}>
                                    <Table.Row>
                                        <Table.Cell singleLine>
                                            <Header textAlign='center'>
                                                {plane.tailnumber}
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {plane.typeaircraft}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {plane.operator_firstname} {plane.operator_lastname}
                                        </Table.Cell>
                                        <Table.Cell singleLine textAlign='right'>
                                            {plane.owner_firstname} {plane.owner_lastname}
                                        </Table.Cell>
                                        <Table.Cell singleLine textAlign='right'>
                                            {plane.cbpdecalnbr}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => this.handleEdit(plane.id)}><Icon name="edit" /></button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => this.handleDelete(plane.id)}><Icon name="trash" /></button>
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

// Get access to aircraft information from redux
const mapStateToProps = (reduxState) => {
    return {
        aircraft: reduxState.aircraftReducer
    }
}

export default connect(mapStateToProps)(AircraftInfo)
