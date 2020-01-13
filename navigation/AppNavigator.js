import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuestionsAndAnswers from '../screens/QuestionsAndAnswers';
import AwaitPlayerAnswers from '../screens/AwaitPlayerAnswersScreen/AwaitPlayerAnswersScreen';
import ResultScreen from '../screens/ResultScreen/ResultScreenWrapper';
import SettingsScreen from '../screens/SettingsScreen';
import FirstSetupScreen from '../screens/FirstSetupScreen';
import CustomDrawer from './CustomDrawer';

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

const DrawerNavigation = createDrawerNavigator({
    Home: {
      screen: MainTabNavigator,
    },
    Settings: {
      screen: SettingsScreen,
    },
}, {
  initialRouteName: 'Home',
  drawerWidth: 300,
  drawerPosition: 'left',
  contentComponent: CustomDrawer
});

export default createAppContainer(
  createSwitchNavigator({
    FirstTimeSetup: FirstTimeSetupNavigator,
    Drawer: DrawerNavigation,
  }),
);
