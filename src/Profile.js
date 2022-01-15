import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUUID from 'react-native-fetch-blob/utils/uuid';




export default function Profile(){
  const [user,Setuser]  = useState({})

const getuser=async()=>{
  const val1 = await AsyncStorage.getItem("UserName") 
  const val2 = await AsyncStorage.getItem("UserEmail") 
  const val3 = await AsyncStorage.getItem("UserPass") 

  console.log("USERR",{val1,val2,val3})
  await Setuser({val1,val2,val3})
}

useEffect(()=>{
  getuser()
  console.log("MYUSER",user)
   
},[])

    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={require("../assets/profilePic.png")}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{user.val1}</Text>
              <Text style={styles.email}>{user.val2}</Text>
            </View>
        </View>
     </View>
    );
  }

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DA251D",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#222222",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{

    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:38,
    color: "#222222",
    fontWeight: "600"
  },
  email:{

    fontSize:20,
    color: "#222222",
    marginTop:10
  },
});