import React from 'react';
import { Text, Button, TextInput } from 'react-native';
import styles from './styles';

import { app } from '../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FridgeList = props => {
  return (
    <React.Fragment>
      {props.fridge.map(item => (
        <Text key={item}>{item}</Text>
      ))}
      <TextInput
        placeholder="add new item"
        style={styles.fridgeAddItem}
        onChangeText={item => props.handleChange(item)}
        autoCapitalize="none"
      />
      <TouchableOpacity
        title="Add Item"
        onPress={props.handleSubmit}
        style={styles.defaultBtn}
      >
        <Text style={styles.defaultBtnText}>Add Item</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default FridgeList;
