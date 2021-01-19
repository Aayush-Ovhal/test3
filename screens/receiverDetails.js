import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';

export default class ReceiverDetails extends React.Component{
  render(){
    return(
      <View>
        <Text>
          ReceiverDetails
        </Text>
      </View>
    )
  }
}