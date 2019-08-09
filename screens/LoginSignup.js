import React from 'react';
import { ScrollView, TextInput, Button, View, Text } from 'react-native';
import styles from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginSignup extends React.Component {
  render() {
    let routeName = this.props.navigation.state.routeName;
    let conditional;
    if (routeName === 'Signup') {
      conditional = this.props.name && this.props.email && this.props.password;
    } else {
      conditional = this.props.email && this.props.password;
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.loginContainer}>
            {this.props.button === 'Sign Up' ? (
              <TextInput
                style={styles.defaultTextEntry}
                autoCapitalize="none"
                onChangeText={name => this.props.handleChange(name, 'name')}
                placeholder="Enter name here"
              />
            ) : (
              <React.Fragment />
            )}
            <TextInput
              style={styles.defaultTextEntry}
              autoCapitalize="none"
              onChangeText={email => this.props.handleChange(email, 'email')}
              placeholder="Enter email here"
            />
            <TextInput
              style={styles.defaultTextEntry}
              autoCapitalize="none"
              onChangeText={password =>
                this.props.handleChange(password, 'password')
              }
              placeholder="Enter password here"
              secureTextEntry={true}
            />
            <TouchableOpacity
              title={this.props.button}
              onPress={this.props.handleSubmit}
              type="outline"
              style={!conditional ? styles.disabledBtn : styles.loginBtn}
              disabled={!conditional}
            >
              <Text style={styles.defaultBtnText}>{this.props.button}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Back to Home"
              onPress={() => this.props.navigation.navigate('Main')}
              type="outline"
              style={styles.defaultBtn}
            >
              <Text style={styles.defaultBtnText}>Back to Home</Text>
            </TouchableOpacity>

            <Text>{this.props.userEmail}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
