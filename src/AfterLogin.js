import React,{ useEffect, useState } from 'react';
import { View, Text, Button, TextInput,Image,ToastAndroid, Alert,TouchableOpacity,StyleSheet,PermissionsAndroid } from 'react-native';
import {Signup,Home_Style} from "../../style.js"
import { openDatabase } from 'react-native-sqlite-storage';
import wifi from "react-native-wifi-reborn"
import androidwifi from "react-native-android-wifi"
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
// import BackgroundTask from 'react-native-background-task'
import BackgroundService from 'react-native-background-actions';
import { jsonToCSV } from 'react-native-csv'
// import RNFetchBlob from 'react-native-fetch-blob';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { response } from 'express';

function UserLogin(props) {
//   const jsonData = `[
//   {
//       "Column 1": "1-1",
//       "Column 2": "1-2",
//       "Column 3": "1-3",
//       "Column 4": "1-4"
//   },
//   {
//       "Column 1": "2-1",
//       "Column 2": "2-2",
//       "Column 3": "2-3",
//       "Column 4": "2-4"
//   },
//   {
//       "Column 1": "3-1",
//       "Column 2": "3-2",
//       "Column 3": "3-3",
//       "Column 4": "3-4"
//   },
//   {
//       "Column 1": 4,
//       "Column 2": 5,
//       "Column 3": 6,
//       "Column 4": 7
//   }
// ]`;

// const results = jsonToCSV(jsonData);
// console.log(results)



  const [list, setList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [InpPass, setInpPass] = useState("");
  const [InpSSID, setInpSSID] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

//   const download=()=>{
//    const jsonData=`[
//      {
//        "FIRST_NAME":"${firstname}",
//        "LAST_NAME":"${lastname}",
//        "EMAIL":"${email}"
//      }
//    ]`
// const results = jsonToCSV(jsonData);

//     // write the current list of answers to a local csv file
// const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/mydata.csv`;
// console.log('pathToWrite', pathToWrite);
// // pathToWrite /storage/emulated/0/Download/data.csv
// RNFetchBlob.fs
//   .writeFile(pathToWrite, results, 'utf8')
//   .then(() => {
//     console.log(`wrote file ${pathToWrite}`);
//     // wrote file /storage/emulated/0/Download/data.csv
//   })
//   .catch(error => console.error(error));
//   }
  // BackgroundTask.define(() => {
  //   console.log('Hello from a background task')
  //   BackgroundTask.finish()
  // })
useEffect(()=>{
  // BackgroundService.start(()=>{console.log("background")},{
  //   taskName: 'Example',
  //   taskTitle: 'ExampleTask title',
  //   taskDesc: 'ExampleTask description',
  //   taskIcon: {
  //       name: 'ic_launcher',
  //       type: 'mipmap',
  //   },
  //   color: '#ff00ff',
  //   linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  //   parameters: {
  //       delay: 1000,
  //   },
  // } );

  // BackgroundService.stop()
  // BackgroundTask.schedule({period:5})
//   const granted =  PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     {
//       title: 'Location permission is required for WiFi connections',
//       message:
//         'This app needs location permission as this is required  ' +
//         'to scan for wifi networks.',
//       buttonNegative: 'DENY',
//       buttonPositive: 'ALLOW',
//     },
// );
// if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//   // You can now use react-native-wifi-reborn
// } else {
//   // Permission denied
// }
androidwifi.setEnabled(false)
androidwifi.loadWifiList((wifiStringList) => {
  var wifiArray = JSON.parse(wifiStringList);
  setList(wifiArray)
    // console.log("slslxsxn",wifiArray);
  },
  (error) => {
    console.log(error);
  }
);

},[])


 const pressed=()=>{
wifi.loadWifiList().then((l)=>console.log("newlist",l))

androidwifi.loadWifiList((wifiStringList) => {
  var wifiArray = JSON.parse(wifiStringList);
    console.log("slslxsxn",wifiArray);
  },(error) => {
    console.log(error);
  })

 }
  // ______WIFI______
  const openToggle=(SSID)=>{
    androidwifi.setEnabled(false)
    setInpSSID(SSID)
    toggleModal()

  }

  const onConnected=()=>{
    if(InpPass!=""){
      // console.log("inside")
    wifi.connectToProtectedSSID(InpSSID, InpPass, true).then(
      () => {
        
        console.log("Connected successfully!");
        ToastAndroid.show("Connected",ToastAndroid.SHORT)
        setInpPass("")
        toggleModal()
      },
      () => {
        console.log("Connection failed!");
      }
    );}
    else{
      ToastAndroid.show("Enter Password",ToastAndroid.SHORT)
    }

  }


 
    return(
      <View style={{ marginTop:"5%",marginBottom:"25%" }}>

      <Text style={{ fontWeight: "bold", fontSize: 32,textAlign:"center" }}>All Wifi Networks</Text>

<ScrollView>
      {list.map((e, i) => {
        return (
          <TouchableOpacity onPress={()=>{openToggle(e.SSID)}} key={i} style={{backgroundColor:"#2F89FF",padding:"3%",margin:"2%"}}>
            <Text style={{color:"white",fontSize:20}}>{e.SSID}</Text>
          </TouchableOpacity>
        )
      })}
    
      </ScrollView>
      <Button title="disconnect" color="red" onPress={() =>androidwifi.setEnabled(false)} />





      <View style={{ marginTop: 10 }}>
        <Modal isVisible={isModalVisible}>
          <View style={{ margin: 20, padding: 20, }}>
            <TextInput keyboardType="visible-password" placeholder="Password" value={InpPass} onChangeText={(e) => setInpPass(e)} />
            <Button title="Connect" onPress={() => onConnected()} />
            <View style={{marginTop:20}} >
            <Button title="Close" onPress={() => toggleModal()} />

            </View>
          </View>
        </Modal>
      </View>

    </View>
     
    )

}

 
export default UserLogin
