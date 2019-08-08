import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import store from '../store/userStore';
import Fridge from '../screens/Fridge';
import Camera from '../screens/Camera';
import ExpoCam from '../screens/ExpoCam';
import NewItems from '../screens/NewItems';

let Navigation = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Login: Login,
    Signup: Signup,
    Fridge: Fridge,
    Camera: Camera,
    ExpoCam: ExpoCam,
    NewItems: NewItems,
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
