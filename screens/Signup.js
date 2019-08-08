import React from 'react';
import LoginSignup from './LoginSignup';
import { connect } from 'react-redux';
import { createUser } from '../store/userStore';

import firebase from 'firebase';
import { app, db } from '../config/firebase';

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
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .then(
        // firebase
        //   .database()
        //   .ref('users')
        //   .set({
        //     email: this.state.email,
        //     fridge: ['apple', 'orange', 'plums'],
        //   })
        db
          .collection('users')
          .doc(this.state.email)
          .set({
            email: this.state.email,
            fridge: ['apple', 'plum', 'pear'],
          })
      );
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
          button="Sign Up"
          navigation={this.props.navigation}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
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
