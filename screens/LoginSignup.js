import React from 'react';
import { ScrollView, TextInput, Button, View } from 'react-native';
import styles from './styles';

import { MonoText } from '../components/StyledText';

export default class LoginSignup extends React.Component {
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
              onChangeText={email => this.props.handleChange(email, 'email')}
              placeholder="Enter email here"
            />
            <TextInput
              style={{
                height: 20,
                borderColor: 'gray',
                borderWidth: 1,
                width: '50%',
              }}
              onChangeText={password =>
                this.props.handleChange(password, 'password')
              }
              placeholder="Enter password here"
            />
            <Button
              title={this.props.button}
              onPress={this.props.handleSubmit}
            />
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
