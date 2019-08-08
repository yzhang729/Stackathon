import Camera from './Camera';
import { View } from 'react-native';
import styles from './styles';
import React from 'react';

const CameraView = () => {
  return (
    <View style={styles.container}>
      <Camera />
    </View>
  );
};

export default CameraView;
