import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import {
    ConfirmationScreen, LoginScreen, OtpScreen,
    OtpVerify,RegistrationNext,RegistrationScreen
} from '../index'


function authStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="confirmationscreen"
                headerMode={'none'}
            >
                <Stack.Screen name="confrimation" component={ConfirmationScreen} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="otpscreen" component={OtpScreen} />
                <Stack.Screen name="otpverify" component={OtpVerify} />
                <Stack.Screen name="registration" component={RegistrationScreen} />
                <Stack.Screen name="registrationnext" component={RegistrationNext} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default authStack;
