import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import CustomHeader from '../components/Header';

export default class SettingScreen extends React.Component{

    constructor(){
     super();
     this.state = {
        emailId: "",
        firstName: "",
        lastName: "",
        contact: "",
        address: "",
        docId: ""
     }
    }

    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where("emailId", "==", email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
             var data = doc.data()
             this.setState({
                 emailId: data.emailId,
                 firstName: data.first_name,
                 lastName: data.last_name,
                 contact: data.contact,
                 address: data.address,
                 docId: doc.id
             })
            })
        })
    }

    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docId)
        .update({
          "first_name": this.state.firstName,
          "last_name": this.state.lastName,
          "contact": this.state.contact,
          "address": this.state.address
        })

        alert("Changes Saved!");
    }

    componentDidMount(){
     this.getUserDetails()
    }

    render(){
        return(
            <SafeAreaProvider>
            <View style = {{flex:1}}>
                <CustomHeader title = {"Setting"} navigation = {this.props.navigation}/>
                <View style = {styles.formContainer}>
                 <TextInput
                  style = {styles.formTextInput}
                  onChangeText = {
                      (text)=>{
                        this.setState({
                            firstName: text
                        })
                      }
                  }
                  value = {this.state.firstName}
                 />

                 <TextInput
                  style = {styles.formTextInput}
                  onChangeText = {
                      (text)=>{
                       this.setState({
                           lastName: text
                       })
                      }
                  }
                  value = {this.state.lastName}
                 />

                 <TextInput
                  style = {styles.formTextInput}
                  maxLength = {10}
                  onChangeText = {
                      (text)=>{
                          this.setState({
                              contact: text
                          })
                      }
                  }
                  value = {this.state.contact}
                 />

                 <TextInput
                  style = {styles.formTextInput}
                  onChangeText = {
                      (text)=>{
                          this.setState({
                              address: text
                          })
                      }
                  }
                  value = {this.state.address}
                 />

                 <TouchableOpacity
                  style = {styles.button}
                  onPress ={
                      ()=>{
                          this.updateUserDetails()
                      }
                  }
                 >
                     <Text style = {styles.buttonText}>
                         Save Changes
                     </Text>
                 </TouchableOpacity>
                </View>
            </View>
         </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
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
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })