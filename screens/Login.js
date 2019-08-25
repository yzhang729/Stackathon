import React from 'react';
import LoginSignup from './LoginSignup';
import firebase from 'firebase';

import { app } from '../config/firebase';

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

  componentDidMount() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.props.navigation.navigate('Fridge');
    }
  }

  handleSubmit() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Fridge'))
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
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
          email={this.state.email}
          password={this.state.password}
        />
      </React.Fragment>
    );
  }
}

export default Login;
