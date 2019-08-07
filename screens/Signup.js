import React from 'react';
import LoginSignup from './LoginSignup';
import { connect } from 'react-redux';
import { createUser } from '../store/userStore';
// import console = require('console');

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

  handleSubmit(event) {
    event.preventDefault();
    this.props.createUser(this.state);
    // this.props.history.push('/my-fridge');
  }

  handleChange() {
    console.log(this.state);
  }

  render() {
    return <LoginSignup button="Sign Up" navigation={this.props.navigation} />;
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
