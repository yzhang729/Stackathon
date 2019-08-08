import React from 'react';
import { Text, Button, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import TagSelector from 'react-native-tag-selector';

import { app } from '../config/firebase';

class NewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selections: [],
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(selection) {
    this.setState({
      selections: selection,
    });
    console.log(this.state);
  }

  render() {
    let answers = this.props.navigation.getParam('answers');
    if (!answers) {
      answers = [];
    }
    const data = answers.map(answer => {
      return { id: answer, name: answer };
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.loginContainer}>
            <Text>Here's what we got from that image: </Text>
            <View style={styles.possibilitiesContainer}>
              <TagSelector
                tags={data}
                onChange={selected => this.clickHandler(selected)}
              />
            </View>
            <Button
              title="Back to Fridge"
              onPress={() => this.props.navigation.navigate('Fridge')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default NewItems;
