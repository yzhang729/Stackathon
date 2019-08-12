import React from 'react';
import firebase from 'firebase';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import TagSelector from 'react-native-tag-selector';

import * as WebBrowser from 'expo-web-browser';

import styles from './styles';
import axios from 'axios';

import { app, db, config } from '../config/firebase';

import { slugify } from './utils';

class RecipeSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      fridge: [],
      selections: [],
      searched: false,
      recipes: [],
      recipeBox: [],
      intolerances: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchAgain = this.searchAgain.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      'didFocus',
      async payload => {
        var user = firebase.auth().currentUser;
        let userFridge = [];
        let userRecipeBox = [];
        let userIntolerances = [];
        if (user) {
          await db
            .collection('users')
            .doc(user.uid)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                console.log('document data obtained');
                userFridge = doc.data().fridge;
                userRecipeBox = doc.data().recipeBox;
                userIntolerances = doc.data().intolerances;
              } else {
                console.log('document does not exist');
              }
            });
        }
        this.setState({
          fridge: userFridge,
          recipeBox: userRecipeBox,
          intolerances: userIntolerances,
        });
      }
    );
  }

  clickHandler(selection) {
    this.setState({
      selections: selection,
    });
  }

  searchAgain() {
    this.setState({
      selections: [],
      recipes: [],
      searched: false,
    });
  }

  async addRecipe(recipe) {
    var user = firebase.auth().currentUser;
    let recipeBox = [];
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            recipeBox = [...doc.data().recipeBox, recipe];
          } else {
            console.log('document does not exist');
          }
        });
      await db
        .collection('users')
        .doc(user.uid)
        .set({ recipeBox: recipeBox }, { merge: true });
    }
    this.setState({
      recipeBox: [...this.state.recipeBox, recipe],
    });
  }

  async handleSubmit() {
    const submission = this.state.selections.join(',');
    const userIntolerances = this.state.intolerances.join(',');
    try {
      const { data } = await axios.get(
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex',
        {
          headers: {
            'x-rapidapi-key':
              '99e97576e6mshfbca1fff3670aaep13399cjsn6c46320424c4',
            'x-rapidapi-host':
              'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          },
          params: {
            includeIngredients: submission,
            ranking: 1,
            limitLicense: true,
            offset: 0,
            number: 25,
            intolerances: userIntolerances,
          },
        }
      );
      data.results.forEach(recipe =>
        this.setState({
          recipes: [
            ...this.state.recipes,
            {
              title: recipe.title,
              imgUrl: recipe.image,
              recipeUrl: `https://spoonacular.com/recipes/${slugify(
                recipe.title
              )}-${recipe.id}`,
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
            <View style={styles.defaultContainer}>
              <Text style={styles.secondaryText}>
                What do you want to use today?
              </Text>
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
            <View style={styles.recipeSearchContainer}>
              <Text style={styles.welcomeText}>Here are some suggestions!</Text>
              {this.state.recipes.map(recipe => {
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
                      {this.state.recipeBox
                        .map(elem => elem.recipeUrl)
                        .indexOf(recipe.recipeUrl) < 0 ? (
                        <TouchableOpacity
                          onPress={() => this.addRecipe(recipe)}
                          style={styles.recipeBtnGreen}
                        >
                          <Text style={styles.defaultBtnText}>Save Recipe</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          disabled={true}
                          style={styles.recipeBtnGray}
                        >
                          <Text style={styles.defaultBtnText}>
                            Already in Box
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={this.searchAgain}
                style={styles.defaultBtn}
              >
                <Text style={styles.defaultBtnText}>Search Again</Text>
              </TouchableOpacity>
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
    backgroundColor: '#5bc0eb',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
};

export default RecipeSearch;
