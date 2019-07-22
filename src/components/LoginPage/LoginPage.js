import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        {/* <div>
            <img src="../public/images/aeroPaladin_logo-02.jpg" alt="logo"/>
 
        </div> */}
        <form onSubmit={this.login}>
          <h1 className="ui header login">Login</h1>
          {/* <div>
            <label className="labelLogin" htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div> */}
          <h4 className="header">Username</h4>
          <div className="ui input username">
            <input 
              type="text" 
              placeholder="johnsmith@email.com"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
             >
            </input>
          </div>
          <br/>
          <h4 className="headerTwo">Password</h4>
          <div className="ui input password">
            <input
              type="password"
              placeholder="1234AbCd"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          {/* <div className="ui input"></div>
            <label className="labelLogin" htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div> */}
          <div>
            <input
              className="ui button log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
          className="registerButton"
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            New User? Register Here
          </button>
        </center>
      </div>
      </div >
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
