import React from 'react'
import { View, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import images from '../assets/images/image';
import { ProfileScreen, HomeScreen } from '..';
import CustomeContent from './CustomeContent';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  alert('hello')
  return (
    <Drawer.Navigator initialRouteName="Home"
    initialRouteName="Home"
   
      drawerContent={(props) => <CustomeContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation