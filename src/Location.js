import React, { useState, useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
} from 'react-native';




function test() {
   
    useEffect(()=>{
        Geolocation.getCurrentPosition(data=>{
            setLati(data.coords.latitude)
            setLongi(data.coords.longitude)
        })
    })
    
    return (
        <>
            <View>
                <Text>Latitude: {lati}</Text>
                <Text>Longitude: {longi}</Text>
            </View>


        </>

    );
}

export default test;