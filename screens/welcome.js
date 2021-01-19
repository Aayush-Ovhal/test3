import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../components/Header';

export default class Welcome extends React.Component{

    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            contact: "",
            address: "",
            emailId: "",
            password: "",
            confirmPassword: "",
            isModalVisible: false
        }
    }

    userSignUp = (emailId, password, confirmPassword)=>{
     if(password !== confirmPassword){
          alert("Check your password!");
     }else{
         firebase.auth().createUserWithEmailAndPassword(emailId, password)
         .then(()=>{
             db.collection('users').add({
                 first_name: this.state.firstName,
                 last_name: this.state.lastName,
                 contact: this.state.contact,
                 address: this.state.address,
                 emailId: this.state.emailId
             })
             return alert("User added successfuly", "", [
                 {text: 'OK', onPress: ()=>{
                     this.setState({
                         "isModalVisible": false
                     })
                 }}
             ]);
         })
         .catch(function(error){
             var errorMessage = error.message;
             return alert(errorMessage)
         })
     }
    }

    userLogIn = (emailId, password)=>{
     firebase.auth().signInWithEmailAndPassword(emailId, password)
     .then(()=>{
         this.props.navigation.navigate("DN");
     })
     .catch((error)=>{
      var errorMessage = error.message;
      return alert(errorMessage);
     })
    }

    disableModal = ()=>{
        this.setState({
            isModalVisible: false
        })

        return alert("Registration cancelled");
    }

    showModal = ()=>{
        return(
            <Modal
             animationType = "fade"
             transparent = {true}
             visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width: "100%"}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text>
                                Registration Form
                            </Text>
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"First Name"}
                             onChangeText = {
                                 (text)=>{
                                  this.setState({
                                      firstName: text
                                  })
                                 }
                             }
                            />
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"Last Name"}
                             onChangeText = {
                                 (text)=>{
                                     this.setState({
                                         lastName: text
                                     })
                                 }
                             }
                            />
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"Contact"}
                             maxLength = {10}
                             keyboardType = {"numeric"}
                             onChangeText={
                                 (text)=>{
                                     this.setState({
                                         contact: text
                                     })
                                 }
                             }
                            />
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"Address"}
                             multiline = {true}
                             keyboardType = {"default"}
                             onChangeText ={
                                 (text)=>{
                                     this.setState({
                                         address: text
                                     })
                                 }
                             }
                            />
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"Email ID"}
                             keyboardType = {"email-address"}
                             onChangeText = {
                                 (text)=>{
                                     this.setState({
                                         emailId: text
                                     })
                                 }
                             }
                            />
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"Password"}
                             secureTextEntry = {true}
                             onChangeText = {
                                 (text)=>{
                                     this.setState({
                                         password: text
                                     })
                                 }
                             }
                            />
                            <TextInput
                            style = {styles.formTextInput}
                             placeholder = {"Confirm Password"}
                             secureTextEntry = {true}
                             onChangeText = {
                                 (text)=>{
                                     this.setState({
                                         confirmPassword: text
                                     })
                                 }
                             }
                            />
                            <TouchableOpacity
                             style = {styles.registerButton}
                             onPress = {
                                 ()=>{
                                     this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                 }
                             }
                            >
                                <Text style = {styles.registerButtonText}>
                                    REGISTER
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            style = {styles.cancelButton}
                            onPress = {
                                ()=>{
                                    this.disableModal()
                                }
                            }>
                                <Text style = {styles.registerButtonText}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <SafeAreaProvider>            
                <View style = {styles.container}>
                <View>
                   {
                       this.showModal()
                   }
                </View>
                <TextInput
                style = {styles.loginBox}
                 placeholder = {"Enter your Email"}
                 keyboardType = {"email-address"}
                 onChangeText = {
                     (text)=>{
                         this.setState({
                             emailId: text
                         })
                     }
                 }
                />

                <TextInput
                 style = {styles.loginBox}
                 placeholder = {"Enter Password"}
                 secureTextEntry = {true}
                 onChangeText = {
                     (text)=>{
                      this.setState({
                         password: text
                      })
                     }
                 }
                />

               <TouchableOpacity
                style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                onPress = {()=>{
                    this.userLogIn(this.state.emailId, this.state.password)
                }}>
                 <Text style = {styles.buttonText}>Login</Text>
               </TouchableOpacity>

               <TouchableOpacity
               style = {styles.button}
               onPress = {()=>this.setState({isModalVisible: true})}
               >
                   <Text style = {styles.buttonText}>
                       Signup
                   </Text>
               </TouchableOpacity>
            </View>
         </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
     width: 350
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
    registerButton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    registerButtonText:{
      color:'#ff5722',
      fontSize:15,
      fontWeight:'bold'
    },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })