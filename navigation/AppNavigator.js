import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import MainTabNavigator, { newItemsStack } from './MainTabNavigator';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import store from '../store/userStore';
import Fridge from '../screens/Fridge';
import Camera from '../screens/Camera';
import ExpoCam from '../screens/ExpoCam';
import NewItems from '../screens/NewItems';
import Home from '../screens/HomeScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeSearch from '../screens/RecipeSearch';

let Navigation = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: Home,
    Login: Login,
    Signup: Signup,
    Fridge: MainTabNavigator,
    Camera: Camera,
    ExpoCam: ExpoCam,
    NewItems: NewItems,
    RecipeSearch: RecipeSearch,
  })
);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

//CHANGE THIS TO CHANGE SCREENS
