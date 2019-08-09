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

let Navigation = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: Home,
    Login: Login,
    Signup: Signup,
    Fridge: MainTabNavigator,
    ExpoCam: ExpoCam,
    NewItems: NewItems,
    RecipeSearch: RecipeSearch,
  })
);

export default class Root extends React.Component {
  render() {
    return <Navigation />;
  }
}

//CHANGE THIS TO CHANGE SCREENS
