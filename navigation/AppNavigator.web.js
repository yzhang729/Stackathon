import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginSignup from '../screens/LoginSignup';
import Fridge from '../screens/Fridge';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Login: LoginSignup,
  Signup: LoginSignup,
  Fridge: Fridge,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
