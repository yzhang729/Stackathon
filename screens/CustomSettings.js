import React from 'react';
import firebase from 'firebase';
import { app } from '../config/firebase';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class CustomSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.setState({ email: user.email });
    }
  }

  async handleLogout() {
    await firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out'))
      .then(() => this.props.navigation.navigate('Main'))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.settingsContainer}>
            <Text style={styles.settingsData}>
              Email: <Text style={styles.settingsData}>{this.state.email}</Text>
            </Text>
          </View>
          <TouchableOpacity
            title="Back to Home"
            onPress={() => this.handleLogout()}
            type="outline"
            style={styles.defaultBtn}
          >
            <Text style={styles.defaultBtnText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default CustomSettings;
