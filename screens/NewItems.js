import React from 'react';
import { Text, Button, View, ScrollView } from 'react-native';
import styles from './styles';

import { app } from '../config/firebase';

class NewItems extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const answers = this.props.navigation.getParam('answers');
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.fridgeContainer}>
            <Text>Possibilities: </Text>
            {answers ? (
              answers.map(answer => <Text key={answer}>{answer}</Text>)
            ) : (
              <Text />
            )}
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
