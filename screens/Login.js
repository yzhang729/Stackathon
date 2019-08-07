import React from 'react';
import LoginSignup from './LoginSignup';

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

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
    this.props.history.push('/my-fridge');
  }

  handleChange() {}

  render() {
    return <LoginSignup button="Log In" navigation={this.props.navigation} />;
  }
}

export default Login;
