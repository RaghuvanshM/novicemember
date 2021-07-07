import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitialScreen from '../screens/BeforeAuthScreens/Startwindow';
import Intro from '../screens/BeforeAuthScreens/Intro';
import Toast from 'react-native-toast-message';
const PreLoginStack = createStackNavigator();

export default function NoAuthRoutes() {
  return (
    <NavigationContainer>
      <PreLoginStack.Navigator screenOptions={{headerShown: false}}>
        <PreLoginStack.Screen
          name="Initial"
          component={InitialScreen}
          options={{headerShown: false}}
        />
        <PreLoginStack.Screen name="Introduction" component={Intro} />
      </PreLoginStack.Navigator>
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
