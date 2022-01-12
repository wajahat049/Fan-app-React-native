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
function  ConnectionWithBLE (){

    const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);
  const [lst, setlst] = useState([]);


  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange(async (state) => {
        // console.log(state);
        const newLogData = logData;
        newLogData.push(state);
        await setLogCount(newLogData.length);
        await setLogData(newLogData);
        subscription.remove();
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);

 

  return (
    <View style={{flex:1, padding:10}}>
      <View style={{flex:1, padding:10}}>
        <Text style={{fontWeight: "bold"}}>Bluetooth Log ({logCount})</Text>
        <FlatList
          data={logData}
          renderItem={({item}) => {
            return (<Text>{item}</Text>)
          }}
        />
        <Button
          title="Turn On Bluetooth"
          onPress={async () => {
            const btState = await manager.state()
            // test is bluetooth is supported
            if (btState==="Unsupported") {
              alert("Bluetooth is not supported");
              return (false);
            }
            // enable if it is not powered on
            if (btState!=="PoweredOn") {
              await manager.enable();
            } else {
              await manager.disable();
            }
            return (true);
          }}
        />
      </View>

      <View style={{flex:2, padding:10}}>
        <Text style={{fontWeight: "bold"}}>Scanned Devices ({deviceCount})</Text>
        <FlatList
          data={Object.values(scannedDevices)}
          renderItem={({item}) => {
            return (
            <View><Text>{`${item.name} (${item.id})$`}</Text>
            <Text>{Object.keys(item)}</Text>
            </View>
            )
          }}
        />
        <Button
          title="Scan Devices"
          onPress={async () => {
            const btState = await manager.state()
            // test if bluetooth is powered on
            if (btState!=="PoweredOn") {
              alert("Bluetooth is not powered on");
              return (false);
            }
            // explicitly ask for user's permission
            const permission = await requestPermission();
            if (permission) {
              manager.startDeviceScan(null, null, async (error, device) => {
                  // error handling
                  if (error) {
                    console.log(error);
                    return
                  }
                  // found a bluetooth device
                  if (device) {
                    if(device.name=="S-89"){
                      console.log("Devices",device)
                      // device.connect().then(()=>{
                      // const characteristics =  device.characteristicsForService("000090ea-0000-1000-8000-00805f9b34fb");
                      // setlst(characteristics)})

                      manager.connectToDevice(device.id) 
  .then((device) => {
  
  device.discoverAllServicesAndCharacteristics()
      .then((results) => { 
        console.log(results);
        
        manager.servicesForDevice(device.id)
          .then((services) => {
            // console.log(services);
            services.map((service,i)=>{
              console.log("length",service.length)
              console.log("id",service.id)
              // console.log("description",service.readDescriptorForCharacteristic())
              
              // service.characteristics((e)=>{console.log("CCCCC",e)})
            })
          });
      });
});
                      // device.connect().then(()=>{
                      //   device.discoverAllServicesAndCharacteristics().then((e)=>console.log("aaaaa",e))

                      // })
                  }
                    // console.log(`${device.name} (${device.id})}`);
                    const newScannedDevices = scannedDevices;
                    newScannedDevices[device.id] = device;
                    await setDeviceCount(Object.keys(newScannedDevices).length);
                    await setScannedDevices(scannedDevices);
                   
                  }
              });
            }
            return (true);
          }}
        />
      </View>
      {/* {console.log("lst",lst)} */}
    </View>
  );
}

export default ConnectionWithBLE




//000090ea-0000-1000-8000-00805f9b34fb

//00001800-0000-1000-8000-00805f9b34fb