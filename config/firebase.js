const firebase = require('firebase');
require('firebase/firestore');

var config = {
  apiKey: 'AIzaSyCyHH-Cfmfq8ZvwK5fDiNjTeWiXgHduFr8',
  authDomain: 'stackathon-81b83.firebaseapp.com',
  databaseURL: 'https://stackathon-81b83.firebaseio.com',
  projectId: 'stackathon-81b83',
  storageBucket: 'stackathon-81b83.appspot.com',
  messagingSenderId: '766362258628',
  appId: '1:766362258628:web:5cc6ab2c8120f029',
};

let app = firebase.initializeApp(config);

const db = firebase.firestore();

module.exports = { db, app, config };
