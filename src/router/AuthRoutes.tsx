import React from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeControlScreen from '../screens/ControlScreens/HomeControlScreen';
import DetailsScreen from '../screens/DetailsScreen';
import images from '../assets/images';
import MyViewScreen from '../screens/MyViewScreens/MyView';
import ManageUsers from '../screens/MyViewScreens/ManageUsers';
import WellnessScreen from '../screens/WellnessScreens/WellnessScreen';
import LightControlScreen from '../screens/ControlScreens/LightControlScreen';
import Appearance from '../screens/MyViewScreens/Appearance';
import AppearancePreview from '../screens/MyViewScreens/AppearancePreview';
import Schedules from '../screens/ScheduleScreens/Schedules';
import CreateEditSchedule from '../screens/ScheduleScreens/CreateEditSchedule';
import Intelligence from '../screens/MyViewScreens/Intelligence';
import Notification from '../screens/MyViewScreens/Notification';

import GallaryImage from '../screens/MyViewScreens/GallaryImage';
const Stack = createStackNavigator();
const StackNavigationScreens = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="HomeControl" component={TabNavigation} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="LightControl" component={LightControlScreen} />
      <Stack.Screen name="ManageUsers" component={ManageUsers} />
      {/* <Stack.Screen name="Settings" component={Schedules} /> */}
      <Stack.Screen name="Appearance" component={Appearance} />
      <Stack.Screen name="AppearancePreview" component={AppearancePreview} />
      <Stack.Screen name="CreateEditSchedule" component={CreateEditSchedule} />
      <Stack.Screen name="Intelligence" component={Intelligence} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="GallaryImage" component={GallaryImage} />
    </Stack.Navigator>
  );
};

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
        component={HomeControlScreen}
        options={{
          tabBarLabel: 'Control',
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
                source={images.tabIcon1}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
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
        component={Schedules}
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
      />
      <Tab.Screen
        name="MyView"
        component={MyViewScreen}
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
                source={images.tabIcon4}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AuthRoutes() {
  return (
    <NavigationContainer>
      <StackNavigationScreens />
    </NavigationContainer>
  );
}
