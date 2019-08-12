import React from 'react';
import firebase from 'firebase';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import TagSelector from 'react-native-tag-selector';

import * as WebBrowser from 'expo-web-browser';

import styles from './styles';

import { app, db, config } from '../config/firebase';

class RecipeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      recipeBox: [],
    };
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      'didFocus',
      async payload => {
        var user = firebase.auth().currentUser;
        let userRecipeBox = [];
        if (user) {
          await db
            .collection('users')
            .doc(user.uid)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                console.log('document data obtained');
                userRecipeBox = doc.data().recipeBox;
              } else {
                console.log('document does not exist');
              }
            });
        }
        this.setState({ recipeBox: userRecipeBox });
      }
    );
  }

  async deleteRecipe(recipe) {
    var user = firebase.auth().currentUser;
    let newRecipeBox = this.state.recipeBox.filter(
      recipes => recipes.recipeUrl !== recipe.recipeUrl
    );
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set({ recipeBox: newRecipeBox }, { merge: true });
      this.setState({ recipeBox: newRecipeBox });
    }
  }

  openLink(link) {
    WebBrowser.openBrowserAsync(link);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.fridgeContainer}>
            {this.state.recipeBox.map(recipe => {
              return (
                <View key={recipe.title} style={styles.recipeContainer}>
                  <Text style={styles.recipeText}>{recipe.title}</Text>
                  <Image
                    source={{ uri: recipe.imgUrl }}
                    style={styles.recipeImg}
                  />
                  <View style={styles.twoBtnContainer}>
                    <TouchableOpacity
                      onPress={() => this.openLink(recipe.recipeUrl)}
                      style={styles.recipeBtnGreen}
                    >
                      <Text style={styles.defaultBtnText}>Go to Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.deleteRecipe(recipe)}
                      style={styles.recipeBtnRed}
                    >
                      <Text style={styles.defaultBtnText}>Delete Recipe</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

RecipeBox.navigationOptions = {
  title: 'Recipe Box',
  headerStyle: {
    backgroundColor: '#5bc0eb',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
};

export default RecipeBox;
