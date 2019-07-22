import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import App from '../App/App'
import './Nav.css';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'



class Nav extends Component {
  state = {
    visible: false
  }
  
  toggleMenu = () => {
    this.setState({
      ...this.state,
      visible: !this.state.visible
    })
  }
    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })
    
  

   render(){  
     const { visible } = this.state

  

      return(
        // <>
        <div className="nav">
          <div>
            <Button.Group className="hamgurger">
              <Button disabled={visible} onClick={this.handleShowClick}>
                <Icon inverted color='white' className='align justify hamburger' size='big' />
              </Button>            
            </Button.Group>          
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
            >
              <Link onClick={this.handleSidebarHide}  to="/home">
                <Menu.Item as='a'>
                  <Icon name='home' />
                    {this.props.user.id ? 'Home' : 'Login / Register'}
                </Menu.Item>
              </Link>

              {this.props.user.id && (
                <>
                  <Link onClick={this.handleSidebarHide} to="/apis/1">
                    <Menu.Item as='a'>
                      <Icon name='plane' />
                      Create New Apis
                </Menu.Item>
                  </Link>
                  <Link onClick={this.handleSidebarHide} to="/userinfo">
                    <Menu.Item as='a'>
                      <Icon name='setting' />
                      Manage Settings
                </Menu.Item>
                  </Link>
                  <Link onClick={this.handleSidebarHide}>
                    <Menu.Item as='a'>
                      <Icon name='setting' />
                      <LogOutButton  />
                </Menu.Item>
                  </Link>
                </>
              )}                      
            </Sidebar>
            <Sidebar.Pusher>              
            </Sidebar.Pusher>          
          </div >
          <Link to="/home">
            <h2 className="nav-title">aeroPaladin</h2>
          </Link>
          <div className="nav-right">
            <Link className="nav-link" to="/home">
              {/* Show this link if they are logged in or not,
              but call this link 'Home' if they are logged in,
              and call this link 'Login / Register' if they are not */}
            </Link>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            
            {/* Always show this link since the about page is not protected */}
        </div>
      </div>  
    )
  };

}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
