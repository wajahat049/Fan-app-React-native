import React,{ useEffect, useState } from 'react';
import { View, Text, Button,FlatList,PermissionsAndroid } from 'react-native';
import {Signup,Home_Style} from "../../style.js"
// import BleManager from "react-native-ble-manager"
import { publish,connect, subscribe, addOnErrorListener , checkBluetoothAvailability,checkBluetoothPermission} from 'react-native-google-nearby-messages';
import { BleManager } from 'react-native-ble-plx';

 const manager = new BleManager();

 //S-89 (F9:99:6D:6B:16:38)
 const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Request for Location Permission",
        message: "Bluetooth Scanner requires access to Fine Location Permission",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return (granted === PermissionsAndroid.RESULTS.GRANTED);
  }
function  Oximeter (){

   
  useEffect(() => {
    const permission =  requestPermission();

      if(permission){
    manager.connectToDevice(
        "F9:99:6D:6B:16:38"
      ).then((e)=>{console.log("daaatttaaa",e)})
   
  }}, []);

 

  return (
    <View style={{flex:1, padding:10,alignItems:"center"}}>
        <Text>Oximeter</Text>
     </View>
  );
}

export default Oximeter




//000090ea-0000-1000-8000-00805f9b34fb