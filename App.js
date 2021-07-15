import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConfirmationScreen, RegistrationScreen, LoginScreen, 
  DrawerNavigation,SplashScreen,OtpScreen, OtpVerify,SearchResultPage,
   Cablist,RegistrationNext, ProfileScreen } 
  from './src';
import FlashMessage from "react-native-flash-message";
import CabListScreen from './src/Screen/CabList';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="OtpSceen" component={OtpScreen} />
        <Stack.Screen name="Otpverify" component={OtpVerify} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerNavigaion" component={DrawerNavigation} />
        <Stack.Screen name="searchresultpage" component={SearchResultPage} />
        <Stack.Screen name="cablistscreen" component={Cablist} />
        <Stack.Screen name="resistrationnext" component={RegistrationNext} />
        <Stack.Screen name="profilescreen" component={ProfileScreen} />
      </Stack.Navigator>
      <FlashMessage position="bottom" duration={25000} />
    </NavigationContainer>
  );
}