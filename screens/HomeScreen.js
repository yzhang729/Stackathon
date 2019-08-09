import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import firebase from 'firebase';

import styles from './styles';

import { MonoText } from '../components/StyledText';
import { app, db } from '../config/firebase';

export default function HomeScreen(props) {
  const { navigate } = props.navigation;
  const user = firebase.auth().currentUser;
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/apple.png')}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.welcomeText}>What's in the Fridge?</Text>
        </View>

        <View style={styles.helpContainer}>
          {!user ? (
            <React.Fragment>
              <TouchableOpacity
                title="Sign Up"
                style={styles.defaultBtn}
                onPress={() => navigate('Signup', { button: 'Sign Up' })}
              >
                <Text style={styles.defaultBtnText}>Signup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="Log In"
                style={styles.loginBtn}
                onPress={() => navigate('Login', { button: 'Log In' })}
              >
                <Text style={styles.defaultBtnText}>Login</Text>
              </TouchableOpacity>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TouchableOpacity
                title="Fridge"
                style={styles.defaultBtn}
                onPress={() => navigate('Fridge')}
                color="#841584"
              >
                <Text style={styles.defaultBtnText}>My Fridge</Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="Camera"
                style={styles.defaultBtn}
                onPress={() => navigate('ExpoCam')}
              >
                <Text style={styles.defaultBtnText}>Camera</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#5bc0eb',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}
