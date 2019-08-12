import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Fridge from '../screens/Fridge';
import ExpoCam from '../screens/ExpoCam';
import NewItems from '../screens/NewItems';
import Home from '../screens/HomeScreen';
import RecipeSearch from '../screens/RecipeSearch';
import RecipeBox from '../screens/RecipeBox';

let Navigation = createAppContainer(
  createSwitchNavigator({
    Main: Home,
    Login: Login,
    Signup: Signup,
    Fridge: MainTabNavigator,
    ExpoCam: ExpoCam,
    NewItems: NewItems,
    RecipeSearch: RecipeSearch,
    RecipeBox: RecipeBox,
  })
);

export default class Root extends React.Component {
  render() {
    return <Navigation />;
  }
}

//CHANGE THIS TO CHANGE SCREENS
