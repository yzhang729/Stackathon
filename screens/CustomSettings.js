import React from 'react';
import firebase from 'firebase';
import { app, db } from '../config/firebase';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import TagSelector from 'react-native-tag-selector';

class CustomSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      intolerances: [],
      diet: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerDiet = this.clickHandlerDiet.bind(this);
  }

  async componentDidMount() {
    let user = firebase.auth().currentUser;
    let userIntolerances = [];
    let userDiet = [];
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('doc data obtained');
            userIntolerances = doc.data().intolerances;
            userDiet = doc.data().diet;
          } else {
            console.log('doc does not exist');
          }
        });
    }
    this.setState({
      email: user.email,
      intolerances: userIntolerances,
      diet: userDiet,
    }).catch(err => console.log('a firebase error has occurred', err));
  }

  clickHandler(selection) {
    this.setState({
      intolerances: selection,
    });
  }

  clickHandlerDiet(selection) {
    this.setState({
      diet: selection,
    });
  }

  async handleSubmit() {
    let user = firebase.auth().currentUser;
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set(
          { intolerances: this.state.intolerances, diet: this.state.diet },
          { merge: true }
        )
        .catch(err => console.log('a firebase error has occurred', err));
    }
  }

  async handleLogout() {
    await firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out'))
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => {
        console.log('an error has occurred logging out', error);
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
    const dietList = ['vegetarian', 'vegan', 'pescetarian'];
    const intolerancesObj = intolerancesList.map(intolerance => {
      return { id: intolerance, name: intolerance };
    });
    const dietObj = dietList.map(diet => {
      return { id: diet, name: diet };
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.defaultContainer}>
            <View style={styles.settingsContainer}>
              <Text style={styles.settingsTitle}>Email: </Text>
              <Text style={styles.settingsData}>{this.state.email}</Text>

              <Text style={styles.settingsTitle}>Intolerances:</Text>
              <TagSelector
                tags={intolerancesObj}
                customSelect={this.state.intolerances}
                onChange={selected => this.clickHandler(selected)}
                containerStyle={styles.settingsTagContainer}
                tagStyle={styles.settingsTag}
                selectedTagStyle={styles.settingsTagSelected}
              />
              <Text style={styles.settingsTitle}>Diet:</Text>
              <TagSelector
                tags={dietObj}
                customSelect={this.state.diet}
                onChange={selected => this.clickHandlerDiet(selected)}
                containerStyle={styles.settingsTagContainer}
                tagStyle={styles.settingsTag}
                selectedTagStyle={styles.settingsTagSelected}
              />
            </View>
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
