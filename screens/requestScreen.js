import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import CustomHeader from '../components/Header';

export default class Request extends React.Component{
    constructor(){
        super();
        this.state = {
            itemName: "",
            reasonToRequest: "",
            userId: firebase.auth().currentUser.email
        }
    }

    createId = ()=>{
        return Math.random().toString(36).substring(7);
    }

    addItem = ()=>{
    var userId = this.state.userId;
    var requestId = this.createId();
     db.collection('items/').add({
         "item_name": this.state.itemName,
         "reason_to_request": this.state.reasonToRequest,
         "user_id": userId,
         "requestId": requestId
     })

     this.setState({
         itemName: "",
         reasonToRequest: ""
     })

     return alert("Item added in our database!");
    }

    render(){
        return(
            <SafeAreaProvider>
            <View style ={{flex: 1}}>
                <CustomHeader title = {"Request Screen"}/>
                <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                <TextInput
                style = {[styles.formTextInput, {height: 80}]}
                  placeholder = {"Write the item's name here"}
                  keyboardType = {"default"}
                  onChangeText = {
                      (text)=>{
                          this.setState({
                              itemName: text
                          })
                  }}/>

                <TextInput
                style = {[styles.formTextInput, {height: 700}]}
                 placeholder = {"Why do you want it?"}
                 keyboardType = {"default"}
                 multiline = {true}
                 onChangeText = {
                     (text)=>{
                         this.setState({
                             reasonToRequest: text
                         })
                     }}/>

                <TouchableOpacity
                 style = {styles.button}
                 onPress = {
                     ()=>{
                         this.addItem()
                     }}>
                    <Text>Add Item</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
         </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )