import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/CustomSettings';
import Fridge from '../screens/Fridge';
import Login from '../screens/Login';
import ExpoCamera from '../screens/ExpoCam';
import NewItems from '../screens/NewItems';
import RecipeSearch from '../screens/RecipeSearch';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const FridgeStack = createStackNavigator(
  {
    Fridge: Fridge,
  },
  config
);

FridgeStack.navigationOptions = {
  tabBarLabel: 'Fridge',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-ice-cream'} />
  ),
};

FridgeStack.path = '';

const CameraStack = createStackNavigator(
  {
    ExpoCam: ExpoCamera,
  },
  config
);

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-camera'} />
  ),
};

CameraStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

SettingsStack.path = '';

const RecipeStack = createStackNavigator(
  {
    RecipeSearch: RecipeSearch,
  },
  config
);

RecipeStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-list'} />
  ),
};

RecipeStack.path = '';

const LoginStack = createStackNavigator(
  {
    Home: HomeScreen,
    Fridge: Fridge,
    Login: Login,
  },
  config
);

LoginStack.path = '';

//this will change the bottom icons
const tabNavigator = createBottomTabNavigator({
  FridgeStack,
  CameraStack,
  RecipeStack,
  SettingsStack,
});

tabNavigator.path = 'Fridge';

export default tabNavigator;

export const newItemsStack = createBottomTabNavigator(
  {
    NewItemsStack: { screen: NewItems },
  },
  { initialRoute: 'NewItems' }
);
