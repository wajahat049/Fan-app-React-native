import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register';
import Login from './Login';
import AfterLogin from './AfterLogin';
import ConnectionWithBLE from "./ConnectionWithBLE"
import Oximeter from "./Oximeter"


const Stack = createStackNavigator();

export default function Navigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: 'black' } }} >
            <Stack.Screen name="Login" component={Login} options={{ title:"Login" }} />
            <Stack.Screen name="Register" component={Register} options={{ title:"Register"}} />
            <Stack.Screen name="AfterLogin" component={AfterLogin} options={{ title:"AfterLogin"}} />
            {/* <Stack.Screen name="ConnectionWithBLE" component={ConnectionWithBLE} options={{ title:"ConnectionWithBLE"}} /> */}
            {/* <Stack.Screen name="Oximeter" component={Oximeter} options={{ title:"Oximeter"}} /> */}


            </Stack.Navigator>
        </NavigationContainer>
    );
}