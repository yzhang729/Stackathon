import React from 'react';
import firebase from 'firebase';
import { Text, View, ScrollView } from 'react-native';
import { config } from '../config/firebase';
import styles from './styles';

import { app, db } from '../config/firebase';
import FridgeList from './FridgeList';

class Fridge extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      fridge: [],
      newItem: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    var user = firebase.auth().currentUser;
    let userFridge = [];
    let userName = '';
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('document data obtained');
            userFridge = doc.data().fridge;
            userName = doc.data().name;
          } else {
            console.log('document does not exist');
          }
        });
    }
    this.setState({ fridge: userFridge, name: userName });
  }

  handleChange(item) {
    this.setState({
      newItem: item,
    });
  }

  async handleSubmit() {
    this.setState({
      fridge: [...this.state.fridge, this.state.newItem],
      newItem: '',
    });
    let newFridge = [...this.state.fridge, this.state.newItem];
    var user = firebase.auth().currentUser;
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set(
          {
            fridge: newFridge,
          },
          { merge: true }
        );
    }
  }

  async handleDelete(item) {
    let newFridge = this.state.fridge.filter(fridge => fridge !== item);
    this.setState({
      fridge: newFridge,
    });
    var user = firebase.auth().currentUser;
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set(
          {
            fridge: newFridge,
          },
          { merge: true }
        );
    }
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
          <View style={styles.fridgeContainer}>
            <Text style={styles.welcomeText}>
              Welcome back, {this.state.name}
            </Text>
            <Text style={styles.secondaryText}>Your current fridge:</Text>
            <FridgeList
              fridge={this.state.fridge}
              newItem={this.state.newItem}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleDelete={this.handleDelete}
              navigation={this.props.navigation}
            />
          </View>
        </React.Fragment>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>{renderPage}</ScrollView>
      </View>
    );
  }
}

Fridge.navigationOptions = {
  title: 'My Fridge',
  headerStyle: {
    backgroundColor: '#5bc0eb',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
};

export default Fridge;
