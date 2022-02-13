import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import images from '../../assets/images/image';
const BackgroundImage = props => {
  return (
    <ImageBackground
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}
      source={images.loginBackground}
      resizeMode={'stretch'}>
      {props.children}
    </ImageBackground>
  );
};
export default BackgroundImage;
