import React from 'react';
import { ScrollView, TextInput, Button, View } from 'react-native';
import styles from './styles';

import { MonoText } from '../components/StyledText';
// import console = require('console');
// import console = require('console');

export default class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'Email', password: 'Password' };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.loginContainer}>
            <TextInput
              style={{
                height: 20,
                borderColor: 'gray',
                borderWidth: 1,
                width: '50%',
              }}
              onChangeText={email => this.setState({ email })}
              placeholder="Enter email here"
              value={this.state.email}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: '50%',
              }}
              onChangeText={password => this.setState({ password })}
              placeholder="Enter password here"
              value={this.state.password}
            />
            <Button title={this.props.button} />
            <Button
              title="Back to Home"
              onPress={() => this.props.navigation.navigate('Main')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
