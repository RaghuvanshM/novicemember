import React from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import images from '../../assets/images/image';
const BackgroundImage = props => {
  return (
    <ImageBackground
      source={images.screenBg}
      style={{height: '100%', width: '100%', flex: 1}}
      resizeMode="stretch">
      <View style={{flex: 1}}>
        <Image
          style={styles.logoimg}
          source={images.logoimg}
          resizeMode="contain"
        />
        {props.children}
      </View>
      <Image
        style={styles.carimag}
        source={images.horrizontalcar}
        resizeMode="contain"
      />
    </ImageBackground>
  );
};
export default BackgroundImage;
const styles = StyleSheet.create({
  logoimg: {
    height: 100,
    width: 100,
    marginTop: 30,
  },
  carimag: {
    height: 100,
    width: 100,
    marginLeft: 20,
  },
});
