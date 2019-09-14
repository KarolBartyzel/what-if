import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuestionsAndAnswers from '../screens/QuestionsAndAnswers';

const MainTabNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    QuestionsAndAnswers,
  },
  {
    initialRouteName: 'Home',
  },
);

export default MainTabNavigator;
