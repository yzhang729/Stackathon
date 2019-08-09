import React from 'react';
import { TouchableOpacity } from 'react-native';
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
      />
    );
  }
}
