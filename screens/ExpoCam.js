import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    identifiedAs: '',
    loading: false,
    answers: [],
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async function() {
    if (this.camera) {
      // Pause the camera's preview
      this.camera.pausePreview();

      // Set the activity indicator
      this.setState((previousState, props) => ({
        loading: true,
      }));

      // Set options
      const options = {
        base64: true,
      };

      // Get the base64 version of the image
      const data = await this.camera.takePictureAsync(options);

      // Get the identified image
      this.identifyImage(data.base64);
    }
  };

  displayAnswer(answers) {
    // Dismiss the acitivty indicator
    this.setState((prevState, props) => ({
      answers: answers,
      loading: false,
    }));

    // Show an alert with the answer on
    Alert.alert('Image identified');

    // Resume the preview
    // this.camera.resumePreview();
    this.props.navigation.navigate('NewItems', { answers: this.state.answers });
  }

  identifyImage(imageData) {
    // Initialise the Clarifai api
    const Clarifai = require('clarifai');

    const app = new Clarifai.App({
      apiKey: '8150ada301ea4604b8d0532ea03b82d6',
    });

    // Identify the image
    app.models
      .predict(Clarifai.GENERAL_MODEL, { base64: imageData })
      .then(response => {
        //this.displayAnswer(response.outputs[0].data.concepts[0].name)
        let answers = response.outputs[0].data.concepts.map(
          output => output.name
        );
        this.displayAnswer(answers);
      })
      .catch(err => alert(err));
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <ActivityIndicator
              size="large"
              style={styles.loadingIndicator}
              color="#fff"
              animating={this.state.loading}
            />
            <CaptureButton
              buttonDisabled={this.state.loading}
              onClick={this.takePicture.bind(this)}
            />
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
