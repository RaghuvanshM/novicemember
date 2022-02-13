import React from 'react';
import {Dimensions, ImageBackground, Text, View} from 'react-native';
import images from '../assets/images/image';
const BackgroundImage = props => {
  return (
    <ImageBackground
      style={{
        height: Dimensions.get('screen').height-100,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
      }}
      source={images.splashbgimage} resizeMode="contain" >
      {props.children}
    </ImageBackground>
  );
};
export default BackgroundImage;