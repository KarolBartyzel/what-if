import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuestionsAndAnswers from '../screens/QuestionsAndAnswers';
import AwaitPlayerAnswers from '../screens/AwaitPlayerAnswersScreen/AwaitPlayerAnswersScreen';
import ResultScreen from '../screens/ResultScreen/ResultScreenWrapper';
import FirstSetupScreen from '../screens/FirstSetupScreen';

const MainTabNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    QuestionsAndAnswers,
    AwaitPlayerAnswers,
    Results: ResultScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const FirstTimeSetupNavigator = createStackNavigator(
  {
    FirstSetup: FirstSetupScreen,
  },
  {
    initialRouteName: 'FirstSetup',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator({
    FirstTimeSetup: FirstTimeSetupNavigator,
    Main: MainTabNavigator,
  }),
);
