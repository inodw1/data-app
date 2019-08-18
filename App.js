import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './app/views/Home';
import Profile from './app/views/Profile';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Profile: {screen: Profile},
});

const App = createAppContainer(AppNavigator);

export default App;
