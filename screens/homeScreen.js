import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config'
import CustomHeader from '../components/Header';

export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      requestedBooksList : []
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection("items")
    .onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        requestedBooksList : requestedBooksList
      });
    })
  }

  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  render(){
    return(
      <SafeAreaProvider>
      <View style={{flex:1}}>
        <CustomHeader title="Home Screen" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List of all Items</Text>
              </View>
            )
            :(
              <FlatList
          data={this.state.requestedBooksList}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text style={{fontWeight: 'bold', fontFamily:'forte', fontSize: 20}}>{item.item_name}</Text>
              <Text style={{fontFamily: 'forte', fontSize: 15}}>{item.reason_to_request}</Text>   
              <TouchableOpacity 
              style={styles.button}
              onPress={()=>{
                this.props.navigation.navigate("ReceiverDetails",{"details": item})
               }}>
                <Text>View</Text>  
              </TouchableOpacity>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
              />
            )
          }
        </View>
      </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    marginLeft: 1480,
    marginBottom: 5,
    backgroundColor: "#00FFFF", 
    width: 55,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    shadowOffset: {
        width: 0,
        height:5
    },
    elevation: 16
  }
})