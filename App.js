import * as React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Welcome from './screens/welcome';
import {DrawerNavigator} from './components/appDrawerNavigator'
import {AppTabNavigator} from './components/appTabNavigator';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const switchNavigator = createSwitchNavigator({
  Welcome: {screen: Welcome},
  DN: {screen: DrawerNavigator},
  AppTabNavigator: {screen: AppTabNavigator}
})

const AppContainer = createAppContainer(switchNavigator);