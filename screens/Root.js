import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import LoginSignup from './LoginSignup';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginSignup },
  SignUp: { screen: LoginSignup },
});

const App = createAppContainer(MainNavigator);

export default App;
