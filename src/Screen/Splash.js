import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import images from '../assets/images/image';


const SplashScreen = () => {
 
  const [isPopup, setIsPopup] = useState(true);


  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={images.splashbgimage}
        style={styles.backgrondimage}>
        {isPopup && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              backgroundColor: 'rgba(3,3,3, 0.5)',
              zIndex: 5,
            }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  backgrondimage: {
    height: '100%',
    resizeMode: 'contain',
  },
});
