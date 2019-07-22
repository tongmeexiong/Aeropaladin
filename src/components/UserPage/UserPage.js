import React, { Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {Button, Menu, Segment, Sidebar} from 'semantic-ui-react';


class UserPage extends Component {

  state = {
      visible: false
    }

    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })




  render(){
    console.log('state change for menu: ', this.state.visible);
    const { visible } = this.state

    return(
  <div>
    <h1 id="welcome">
      Welcome, { props.user.username }!
    </h1>
    <p>Your ID is: {props.user.id}</p>
    <LogOutButton className="log-in" />
  </div>

  )}
}
// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
