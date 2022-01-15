import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register';
import Login from './Login';
import AfterLogin from './AfterLogin';
import ConnectionWithBLE from "./ConnectionWithBLE"
import Oximeter from "./Oximeter"
import Profile from "./Profile"

const Stack = createStackNavigator();

export default function Navigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator >
            <Stack.Screen name="Login" component={Login} options={{ title:"Login" }} />
            <Stack.Screen name="Register" component={Register} options={{ title:"Register"}} />
            <Stack.Screen name="AfterLogin" component={AfterLogin} options={{ title:"AfterLogin"}} />
            <Stack.Screen name="Profile" component={Profile} options={{ title:"Profile"}} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}