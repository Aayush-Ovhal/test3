import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {AppStackNavigator} from './appStackNavigator';
import Request from '../screens/requestScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: <Image source = {require("../assets/home.png")} style={{width:20, height:20}}/>,
            tabBarLabel: "HOME SCREEN"
        }
    },
    Request: {
        screen: Request,
        navigationOptions: {
            tabBarIcon: <Image source = {require("../assets/request.png")} style={{width:20, height:20}}/>,
            tabBarLabel: "REQUEST SCREEN"
        }
    }
})