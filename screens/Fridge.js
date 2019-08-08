import React from 'react';
import firebase from 'firebase';
import { Text, View, ScrollView, Button, TextInput } from 'react-native';
import { config } from '../config/firebase';
import styles from './styles';

import FrigeList from './FridgeList';

import { app, db } from '../config/firebase';
import FridgeList from './FridgeList';

class Fridge extends React.Component {
  constructor() {
    super();
    this.state = {
      fridge: ['apples', 'pears', 'plums'],
      newItem: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (!user) {
      this.setState({
        fridge: [],
      });
    } else {
      db.collection('users')
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('document data obtained');
          } else {
            console.log('document does not exist', doc);
          }
        });
    }
  }

  handleChange(item) {
    this.setState({
      newItem: item,
    });
  }

  handleSubmit() {
    this.setState({
      fridge: [...this.state.fridge, this.state.newItem],
      newItem: '',
    });
    console.log(this.state);
  }
  render() {
    var user = firebase.auth().currentUser;
    let renderPage;
    if (!user) {
      renderPage = (
        <React.Fragment>
          <Text>You are not logged in</Text>
        </React.Fragment>
      );
    } else {
      renderPage = (
        <React.Fragment>
          <View style={styles.loginContainer}>
            <Text>
              Welcome back {user.email}
              {'\n'}My Fridge:{'\n'}
            </Text>
            <FridgeList
              fridge={this.state.fridge}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </View>
        </React.Fragment>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.fridgeContainer}>
            {renderPage}
            <Button
              onPress={() => this.props.navigation.navigate('Main')}
              title="Go back from this Page"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Fridge;
