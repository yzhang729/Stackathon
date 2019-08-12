import React from 'react';
import LoginSignup from './LoginSignup';

import firebase from 'firebase';
import { app, db } from '../config/firebase';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.props.navigation.navigate('Fridge');
    }
  }

  handleSubmit() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user =>
        db
          .collection('users')
          .doc(user.user.uid)
          .set({
            name: this.state.name,
            email: this.state.email,
            fridge: [],
            recipeBox: [],
            intolerances: [],
            diet: [],
          })
      )
      .then(() => this.props.navigation.navigate('Fridge'))
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(error.message);
      });
  }

  handleChange(value, stateName) {
    this.setState({
      [stateName]: value,
    });
  }

  render() {
    return (
      <LoginSignup
        button="Sign Up"
        navigation={this.props.navigation}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        email={this.state.email}
        name={this.state.name}
        password={this.state.password}
      />
    );
  }
}

export default Signup;
