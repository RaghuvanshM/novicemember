import React from 'react';
import {ImageBackground, Text, ScrollView, View} from 'react-native';
import images from '../assets/images/image';
import BackgroundImage from '../component/BackgroundImage/BackgroundImage';

const Confirmation = () => {
  return (
    <BackgroundImage>
      <View
        style={{
          height: 300,
          width: '80%',
          justifyContent: 'center',
          
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Login{' '}
          </Text>
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};
export default Confirmation;
