import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../screens/';
import ReceiverDetails from '../screens/receiverDetails';

export const AppStackNavigator = createStackNavigator({
  Home: {
      screen: Home,
      navigationOptions: {
          headerShown: false
      },
  ReceiverDetails: {
      screen: ReceiverDetails,
      navigationOptions: {
          headerShown: false
      }
  }
  }
},
{
 initialRouteName: 'Home'
}
)