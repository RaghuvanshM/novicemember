import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import images from '../assets/images/image';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../module/selectors';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
const SplashScreen = () => {
  const navigation = useNavigation();
  const [isPopup, setIsPopup] = useState(false);
  const profile = useSelector(getUserProfile);
  useEffect(() => {
    setTimeout(() => {
      setIsPopup(true);
    }, 1000);
  }, []);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '465592120377-s3fk75qls260d8gmpfjk4f1jusueva4d.apps.googleusercontent.com',
      offlineAccess: true,
    });
    setTimeout(() => {
      if(profile.user.isAuth) {
        console.log(profile.user.isAuth)
        navigation.navigate('BottomTab');
      } else {
        console.log(profile.user.isAuth)
        navigation.navigate('Confirmation');
      }
      setIsPopup(false);
    }, 5000);
  }, []);
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
