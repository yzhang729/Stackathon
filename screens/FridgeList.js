import React from 'react';
import { Text, Button, TextInput } from 'react-native';
import styles from './styles';

import { app } from '../config/firebase';

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
      />
      <Button title="Add Item" onPress={props.handleSubmit} />
    </React.Fragment>
  );
};

export default FridgeList;
