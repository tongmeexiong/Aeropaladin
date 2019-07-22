import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';

const moment = require('moment');

/**
 * This displays on the dashboard and 
 * contains all the APIS' that have flights that have
 * already happened.
 */
class HistoricTable extends Component {
    //'deletes' the flight from the dashboard view by changing the flight status
    handleArchive = (idToUpdate) => {
        this.props.dispatch({ type: 'DELETE_APIS_TRIPS', payload: { id: idToUpdate } })
    }

    render() {
        return (

            <div>
                <Table className="historicTable" celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>FROM</Table.HeaderCell>
                            <Table.HeaderCell>TO</Table.HeaderCell>
                            <Table.HeaderCell>DATE</Table.HeaderCell>
                            <Table.HeaderCell>ARCHIVE</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>


                    {this.props.apisTrips.map(trip => {
                        return ((trip.flight_status == 1) ?
                            <Table.Body key={trip.flight_id}>
                                <Table.Row>
                                    <Table.Cell className={"departureInfoCell"}>
                                        {trip.departureairportcity}, {trip.departurecountrycode} Description: ({trip.departureairportdesc})
                                    </Table.Cell>
                                    <Table.Cell className={"inboundInfoCell"}>
                                        {trip.inboundairportcity}, {trip.inboundcountrycode} Description: ({trip.inboundaiportdesc})
                                    </Table.Cell>
                                    <Table.Cell className={"timeCell"}>
                                        {moment(trip.localarrivaltimestamp).format("MM/DD/YY")} at {moment(trip.arrivaltimestamp).format('LT')}
                                    </Table.Cell>
                                    <Table.Cell>
                                       <div className="ui animated small button green" tabIndex="0" onClick={() => this.handleArchive(trip.id)}>
                                            <div class="visible content">Archive</div>
                                            <div class="hidden content">
                                                <i class="right archive icon"></i>
                                            </div>
                                        </div>                                        
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body> : <p></p>)
                    })}
                </Table>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    apisTrips: state.dashboardReducer,
    user: state.user,
    login: state.loginModeReducer
})

export default withRouter(connect(mapStateToProps)(HistoricTable));