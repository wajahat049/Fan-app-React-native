import React,{ useEffect, useState } from 'react';
import { View, Text, Button, TextInput,Image,ToastAndroid,StyleSheet } from 'react-native';
import {Signup,Home_Style} from "../../style.js"
import { openDatabase } from 'react-native-sqlite-storage';
import { json } from 'express';
import Geolocation from '@react-native-community/geolocation';



function UserRegister(props) {
// var db = openDatabase({ name: 'UserDatabase.db' });
const [lati, setLati] = useState('')
const [longi, setLongi] = useState('')
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  useEffect(()=>{
    Geolocation.getCurrentPosition(data=>{
      setLati(data.coords.latitude)
      setLongi(data.coords.longitude)
  },err=>console.log(err),{enableHighAccuracy:false,timeout:500})
  })

  const onRegister=()=>{
    if(email!="" && name!="" && pass!=""){
    console.log("register")
    fetch('https://auth-sql-app.herokuapp.com/Login').then((response) => response.json())
    .then((json) => {
       console.log(json)
       for(var i=0;i<json.length;i++){
        var user = json[i]
        if(user.Email==email){
          ToastAndroid.show("User already registered",ToastAndroid.SHORT)
          props.navigation.navigate("Login")
          break
        }}
        
          fetch('https://auth-sql-app.herokuapp.com/Signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Name:name,Email:email,Password:pass,Latitude:lati,Longitude:longi}) 
          })
          ToastAndroid.show("Successfully registered",ToastAndroid.SHORT)
          props.navigation.navigate("Login")
      
    })
    }
  
  else{
    ToastAndroid.show("Fill all the fields",ToastAndroid.SHORT)
  }
  }

    return(
     <View style={{alignItems:"center",marginTop:"25%"}}>
      <View>
        <Text style={{ fontSize: 50, color: "white", fontWeight: 'bold',marginBottom:10 }}>Register</Text>
      </View>
      <View style={styles.field}>
        <TextInput style={{color:"white",fontSize:17}} placeholderTextColor="white" value={name} keyboardType={"default"} onChangeText={(e)=>setName(e)} placeholder="Name"/>
      </View>
      <View style={styles.field}>
        <TextInput style={{color:"white",fontSize:17}} placeholderTextColor="white" value={email} keyboardType={"email-address"} onChangeText={(e)=>setEmail(e)} placeholder="Email"/>
      </View>
      <View style={styles.field}>
        <TextInput style={{color:"white",fontSize:17}} placeholderTextColor="white" secureTextEntry={true} value={pass} onChangeText={(e) => setPass(e)} placeholder="Password" />
      </View>

      <View style={{margin:"5%",paddingLeft:"3%",paddingRight:"3%",backgroundColor:"navy"}}>
    <Text onPress={()=>onRegister()} style={styles.ButtonStyle}>Register</Text>
    </View>
</View>
    )

}



const styles = StyleSheet.create({
  field:{
    borderWidth: 2,
    borderColor: "white",
    width: "90%",
    height:'12%',
    margin: 15,
    fontSize:"25px",
    color:"white"
  },
  ButtonStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color:"white"

},
}
)
 

 
export default UserRegister;
