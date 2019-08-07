import React from 'react';
import LoginSignup from './LoginSignup';
import firebase from 'firebase';

import { app } from '../config/firebase';
var user = firebase.auth().currentUser;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
      })
      .then(() => this.props.navigation.navigate('Fridge'));
  }

  handleChange(value, stateName) {
    this.setState({
      [stateName]: value,
    });
  }
  render() {
    return (
      <React.Fragment>
        <LoginSignup
          button="Log In"
          navigation={this.props.navigation}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default Login;
