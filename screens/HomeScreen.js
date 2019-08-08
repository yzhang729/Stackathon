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

import styles from './styles';

import { MonoText } from '../components/StyledText';

export default function HomeScreen(props) {
  const { navigate } = props.navigation;
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
          <TouchableOpacity
            title="Sign Up"
            style={styles.defaultBtn}
            onPress={() => navigate('Signup', { button: 'Sign Up' })}
          >
            <Text style={styles.defaultBtnText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Log In"
            style={styles.defaultBtn}
            onPress={() => navigate('Login', { button: 'Log In' })}
          >
            <Text style={styles.defaultBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Fridge"
            style={styles.defaultBtn}
            onPress={() => navigate('Fridge')}
            color="#841584"
          >
            <Text style={styles.defaultBtnText}>Fridge</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Camera"
            style={styles.defaultBtn}
            onPress={() => navigate('ExpoCam')}
          >
            <Text style={styles.defaultBtnText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}
        >
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
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
