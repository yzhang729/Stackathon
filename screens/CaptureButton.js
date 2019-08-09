import React from 'react';
import { StyleSheet, Button, TouchableHighlight } from 'react-native';

export default class CaptureButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.captureButton}
        disabled={this.props.buttonDisabled}
      >
        <Button
          onPress={this.props.onClick}
          disabled={this.props.buttonDisabled}
          title="Capture"
          accessibilityLabel="Learn more about this button"
          color="white"
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  captureButton: {
    marginBottom: 30,
    width: 160,
    borderRadius: 10,
    backgroundColor: '#5bc0eb',
    alignSelf: 'center',
  },
});
