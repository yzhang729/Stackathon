import React from 'react';
import LoginSignup from './LoginSignup';
import { connect } from 'react-redux';
import { createUser } from '../store/userStore';

import { db } from '../config/firebase';
import firebase from 'firebase';

class Signup extends React.Component {
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
    // db.collection('users')
    //   .add({
    //     email: this.state.email,
    //     password: this.state.password,
    //   })
    //   .then(function(docRef) {
    //     console.log('docref', docRef);
    //   });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
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
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
