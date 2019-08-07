import React from 'react';
import { ScrollView, TextInput, Button, View, Text } from 'react-native';
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
              style={styles.passwordEntry}
              autoCapitalize="none"
              onChangeText={email => this.props.handleChange(email, 'email')}
              placeholder="Enter email here"
            />
            <TextInput
              style={styles.passwordEntry}
              autoCapitalize="none"
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
            <Text>{this.props.userEmail}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
