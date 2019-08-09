import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

import { app } from '../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FridgeList = props => {
  return (
    <React.Fragment>
      {props.fridge.map(item => (
        <View style={styles.fridgeListView} key={item}>
          <Text style={styles.fridgeItem}>{item}</Text>
          <TouchableOpacity
            style={styles.deleteItemBtn}
            onPress={() => props.handleDelete(item)}
          >
            <Text style={styles.deleteItemTxt}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TextInput
        placeholder="add new item"
        style={styles.defaultTextEntry}
        onChangeText={item => props.handleChange(item)}
        autoCapitalize="none"
        value={props.newItem}
      />
      <TouchableOpacity
        onPress={props.handleSubmit}
        style={styles.loginBtn}
        disabled={!props.newItem}
      >
        <Text style={styles.defaultBtnText}>Add Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.defaultBtn}
        onPress={() => props.navigation.navigate('ExpoCam')}
      >
        <Text style={styles.defaultBtnText}>Camera View</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default FridgeList;
