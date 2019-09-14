import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuestionsAndAnswers from '../screens/QuestionsAndAnswers';
import AwaitPlayerAnswers from '../screens/AwaitPlayerAnswersScreen/AwaitPlayerAnswersScreen';
import ResultScreen from '../screens/ResultScreen/ResultScreenWrapper';

const MainTabNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    QuestionsAndAnswers,
    AwaitPlayerAnswers,
    Results: ResultScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default MainTabNavigator;
