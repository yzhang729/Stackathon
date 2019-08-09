import React from 'react';
import firebase from 'firebase';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import TagSelector from 'react-native-tag-selector';

import * as WebBrowser from 'expo-web-browser';

import { config } from '../config/firebase';
import styles from './styles';
import { connect } from 'react-redux';
import axios from 'axios';

import { app, db } from '../config/firebase';

class RecipeSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      fridge: [],
      selections: [],
      searched: false,
      recipes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    var user = firebase.auth().currentUser;
    let userFridge = [];
    if (user) {
      await db
        .collection('users')
        .doc(user.email)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log('document data obtained');
            userFridge = doc.data().fridge;
          } else {
            console.log('document does not exist');
          }
        });
    }
    this.setState({ fridge: userFridge });
  }

  clickHandler(selection) {
    this.setState({
      selections: selection,
    });
  }

  async handleSubmit() {
    const submission = this.state.selections.join(',');
    try {
      const { data } = await axios.get(
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        {
          headers: {
            'x-rapidapi-key':
              '99e97576e6mshfbca1fff3670aaep13399cjsn6c46320424c4',
            'x-rapidapi-host':
              'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          },
          params: {
            ingredients: submission,
            ignorePantry: true,
            ranking: 1,
            limitLicense: true,
            number: 10,
          },
        }
      );
      data.forEach(recipe =>
        this.setState({
          recipes: [
            ...this.state.recipes,
            {
              title: recipe.title,
              imgUrl: recipe.image,
              recipeUrl: `https://spoonacular.com/recipes/${recipe.title
                .split(' ')
                .join('-')}-${recipe.id}`,
            },
          ],
        })
      );
      this.setState({ searched: true });
    } catch (err) {
      console.log('an error has occurred', err);
    }
  }

  openLink(link) {
    console.log(link);
    WebBrowser.openBrowserAsync(link);
  }

  render() {
    let fridge = this.state.fridge;
    if (!fridge) {
      fridge = [];
    }
    const data = fridge.map(item => {
      return { id: item, name: item };
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          {!this.state.searched ? (
            <View style={styles.loginContainer}>
              <Text>Your current items:</Text>
              <View style={styles.possibilitiesContainer}>
                <TagSelector
                  tags={data}
                  onChange={selected => this.clickHandler(selected)}
                />
              </View>

              <TouchableOpacity
                onPress={this.handleSubmit}
                style={styles.defaultBtn}
              >
                <Text style={styles.defaultBtnText}>Search for Recipes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.fridgeContainer}>
              <Text>Here are some suggestions!</Text>
              {this.state.recipes.map(recipe => {
                return (
                  <View key={recipe.title} style={styles.recipeContainer}>
                    <Image
                      source={{ uri: recipe.imgUrl }}
                      style={styles.recipeImg}
                    />
                    <TouchableOpacity
                      onPress={() => this.openLink(recipe.recipeUrl)}
                      style={styles.recipeBtn}
                    >
                      <Text style={styles.defaultBtnText}>{recipe.title}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

RecipeSearch.navigationOptions = {
  title: 'Recipe Search',
  headerStyle: {
    backgroundColor: '#b38d97',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default RecipeSearch;
