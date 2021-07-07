import React from 'react'
import {View,Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import images from '../assets/images/image';
import { ProfileScreen,HomeScreen } from '..';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: 'black'},
        labelStyle: {fontSize: 12, fontFamily: 'IBMPlexSans-Medium'},
        inactiveTintColor: 'rgba(255,255,255, 0.3)',
        activeTintColor: '#fff',
      }}>
      <Tab.Screen
        name="HomeControl"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  {
                    width: 60,
                    height: 25,
                    resizeMode: 'contain',
                  },
                  !focused && {tintColor: 'rgba(255, 255,255,0.3)'},
                ]}
                source={images.tabicon1}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Wellness"
        component={WellnessScreen}
        options={{
          tabBarLabel: 'Wellness',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  {
                    width: 60,
                    height: 25,
                    resizeMode: 'contain',
                  },
                  !focused && {tintColor: 'rgba(255, 255,255,0.3)'},
                ]}
                source={images.tabIcon2}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  {
                    width: 60,
                    height: 25,
                    resizeMode: 'contain',
                  },
                  !focused && {tintColor: 'rgba(255, 255,255,0.3)'},
                ]}
                source={images.tabIcon3}
              />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="MyView"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My View',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={[
                  {
                    width: 60,
                    height: 25,
                    resizeMode: 'contain',
                  },
                  !focused && {tintColor: 'rgba(255, 255,255,0.3)'},
                ]}
                source={images.tabicon2}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation