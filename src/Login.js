import React,{ useEffect, useState } from 'react';
import { View, Text, Button, TextInput,Image,ToastAndroid, Alert,TouchableOpacity,StyleSheet,AsyncStorageStatic } from 'react-native';
import {Signup,Home_Style} from "../../style.js"
import { openDatabase } from 'react-native-sqlite-storage';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';




function UserLogin(props) {
var db = openDatabase({ name: 'UserDatabase.db' });
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

  const onForget=()=>{
    if(email!=""){
    console.log("Forget")    
          fetch('https://auth-sql-app.herokuapp.com/ForgetEmail', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email:email}) 
          })
          ToastAndroid.show("Email has been sent to your account",ToastAndroid.SHORT)
          // props.navigation.navigate("Login")
    }
    
  else{
    ToastAndroid.show("Input email first",ToastAndroid.SHORT)
  }

  }

  const onLogin=async()=>{
    // if(email!="" && pass!=""){
    //   fetch('https://auth-sql-app.herokuapp.com/Login')
    //   .then((response) => response.json())
    //   .then((results) => {
    //     console.log(results.length)
    //     if(results.length==0){
    //       console.log("length==0")
    //       ToastAndroid.show("Please register first",ToastAndroid.SHORT)}
        
    //     for(var i=0;i<results.length;i++){
    //       user = results[i]
    //       console.log(user)
    //       if(i==results.length-1){
    //         console.log("length-1")
    //         if(user.Email!=email){
    //         console.log("!email")

    //         ToastAndroid.show("Please register first",ToastAndroid.SHORT)
    //         setEmail("")
    //         setPass("")
    //         break
    //       }
    //       }
    //       if(user.Email==email){
    //         console.log("email if")
    //         if(user.Password==pass){
    //         console.log("pass if")

    //           console.log("Location",lati,longi)
    //           fetch('https://auth-sql-app.herokuapp.com/Location', {
    //         method: 'POST',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({Latitude:lati,Longitude:longi,Email:email}) 
    //       })
    //         console.log("User login")
    //         ToastAndroid.show("You are successfully login",ToastAndroid.SHORT)
    //         setEmail("")
    //         setPass("")
            
    //         props.navigation.navigate("AfterLogin")
    //         break
    //         }
          
    //       else{
    //         console.log("pass else")

    //         console.log("not user")
    //         ToastAndroid.show("Enter correct passsword",ToastAndroid.SHORT)
    //         break
    //       }
    //     }
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // }


    if(email!="" && pass!=""){
      if(email=="email@gmail.com" && pass=="pass123")
      ToastAndroid.show("Login successfully",ToastAndroid.SHORT)
      setEmail("")
      setPass("")
      setName("")
      await AsyncStorage.setItem("UserEmail",email)
      await AsyncStorage.setItem("UserName",name)
      await AsyncStorage.setItem("UserPass",pass)
      props.navigation.navigate("AfterLogin")
    }

    else{
      ToastAndroid.show("Fill all the fields",ToastAndroid.SHORT)
    }
    
  }

    return(
     <View style={{alignItems:"center",marginTop:"25%"}}>
      <View>
        <Text style={{ fontSize: 50, color: "#DA251D", fontWeight: 'bold',marginBottom:10,}}>Login</Text>
      </View>
      <View style={styles.field}>
        <TextInput style={{color:"#222222",fontSize:17}} placeholderTextColor="#222222"  value={name} keyboardType={"default"} onChangeText={(e)=>setName(e)} placeholder="Name"/>
      </View>
      <View style={styles.field}>
        <TextInput style={{color:"#222222",fontSize:17}} placeholderTextColor="#222222"  value={email} keyboardType={"email-address"} onChangeText={(e)=>setEmail(e)} placeholder="Email"/>
      </View>
      <View style={styles.field}>
        <TextInput style={{color:"#222222",fontSize:17}} placeholderTextColor="#222222" secureTextEntry={true} value={pass} onChangeText={(e) => setPass(e)} placeholder="Password" />
      </View>

    
    <View style={{margin:"5%",paddingLeft:"3%",paddingRight:"3%",backgroundColor:"#DA251D"}}>
    <Text onPress={()=>onLogin()} style={styles.ButtonStyle}>Login</Text>
    </View>
    <View style={{paddingLeft:"3%",paddingRight:"3%",}}>
    <Text onPress={()=>onForget()} style={{color:"#222222",fontSize:20}}>Forget Password?</Text>
  </View>
    <View style={{margin:"10%",paddingLeft:"5%",paddingRight:"5%",backgroundColor:"#DA251D",marginTop:"5%"}}>
    <Text onPress={()=>props.navigation.navigate("Register")} style={styles.ButtonStyle}>Register</Text>
    </View>
    
    

</View>
    )

}

const styles = StyleSheet.create({
    field:{

      borderWidth: 2,
      borderColor: "#DA251D",
      width: "90%",
      height:'10%',
      margin: 15,
      fontSize:"25px",
      color:"white",
    },
    ButtonStyle: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      fontWeight: 'bold',
      color:"white",
      

  },
}
)

 
export default UserLogin