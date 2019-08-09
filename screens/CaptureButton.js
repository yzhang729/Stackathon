import React from 'react';
import {
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';

export default class CaptureButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.captureBtn}
        disabled={this.props.buttonDisabled}
        onPress={this.props.onClick}
      >
        {/* <Button
          onPress={this.props.onClick}
          disabled={this.props.buttonDisabled}
          title="Capture"
          color="white"
        /> */}
        <Text style={styles.defaultBtnText}>Capture</Text>
      </TouchableOpacity>
    );
  }
}
