import React from 'react';
import firebase from 'firebase';
import { app, db } from '../config/firebase';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import styles from './styles';
import TagSelector from 'react-native-tag-selector';

class CustomSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      intolerances: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  async componentDidMount() {
    var user = firebase.auth().currentUser;
    let userIntolerances = [];
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('doc data obtained');
            userIntolerances = doc.data().intolerances;
          } else {
            console.log('doc does not exist');
          }
        });
    }
    this.setState({ email: user.email, intolerances: userIntolerances });
  }

  clickHandler(selection) {
    this.setState({
      intolerances: selection,
    });
  }

  async handleSubmit() {
    var user = firebase.auth().currentUser;
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set({ intolerances: this.state.intolerances }, { merge: true });
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
    const intolerancesList = [
      'dairy',
      'gluten',
      'peanut',
      'shellfish',
      'sesame',
      'soy',
      'tree nut',
      'sulfite',
    ];
    const intolerancesObj = intolerancesList.map(intolerance => {
      return { id: intolerance, name: intolerance };
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.defaultContainer}>
            <Text style={styles.settingsData}>
              Email: <Text style={styles.settingsData}>{this.state.email}</Text>
            </Text>

            <Text style={styles.secondaryText}>Intolerances</Text>
            <TagSelector
              tags={intolerancesObj}
              customSelect={this.state.intolerances}
              onChange={selected => this.clickHandler(selected)}
            />
            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              type="outline"
              style={styles.defaultBtn}
            >
              <Text style={styles.defaultBtnText}>Submit Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleLogout()}
              type="outline"
              style={styles.logoutBtn}
            >
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

CustomSettings.navigationOptions = {
  title: 'My Settings',
  headerStyle: {
    backgroundColor: '#5bc0eb',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
};

export default CustomSettings;
