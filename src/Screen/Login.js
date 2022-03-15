import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {
  authUser,
  loginButtonPress,
  loginSuccess,
  removeButtonPress,
} from '../module/actions';
import CutomButton from '../component/Button/Button';
import CustomTextInput from '../component/TextInput/TextBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel';
import Colors from '../module/utils/Colors';
import Iconlist from '../module/utils/icon';
import images from '../assets/images/image';
import {getIsButtonCLick} from '../module/selectors/user';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({props}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isbuttonclick = useSelector(getIsButtonCLick);

  const loginButtonClick = async () => {
    let token = await messaging().getToken()
    console.log(token)
    dispatch(loginButtonPress())
    dispatch(authUser({ email, password, token }))
    dispatch(loginSuccess());
  };
  useEffect(async () => {
    dispatch(removeButtonPress());
    GoogleSignin.configure({
      webClientId:
        '470668762963-a0m9hsdob83m1folnhku0av4mrbj33jg.apps.googleusercontent.com',

      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();
      dispatch(authUser(userinfo.user));
    } catch (error) {}
  };

  return (
    <>
      {isbuttonclick && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(3,3,3, 0.8)',
            zIndex: 5,
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={Iconlist.arrowleft} size={30} style={{margin: '4%'}} />
        </TouchableOpacity>
        <View style={{flex: 0}}>
          <Image
            source={images.parrentloginiamge}
            resizeMode="contain"
            style={{height: 70, width: '90%'}}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <CustomTextBoxLabel label={'Enter Email'} />
          </View>
          <CustomTextInput
            placeholder={'Email'}
            onChangeText={text => setEmail(text)}
            defaultValue={'raghu11697@gmail.com'}
          />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <CustomTextBoxLabel label={'Enter Password'} />
          </View>
          <CustomTextInput
            placeholder={'Password '}
            onChangeText={text => setPassword(text)}
            defaultValue={'123456'}
          />
          <View>
            <CutomButton
              title={'Login'}
              textStyle={styles.buttontext}
              onPress={() => {
                loginButtonClick();
              }}
            />
          </View>
          <View style={styles.forgetpasswordview}>
            <Text style={styles.forgetpasstext}>Forget Password?</Text>
            <Text style={styles.resettext}>Reset here</Text>
          </View>
        </View>
        <View style={styles.googleloginbutton}>
          <GoogleSigninButton
            style={{width: wp('90%')}}
            onPress={signIn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  loginview: {
    flex: 1,
  },
  singletextinput: {
    width: wp('95%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  loginview: {justifyContent: 'center', flex: 1, alignSelf: 'center'},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    padding: 10,
    width: wp('90%'),
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  googleloginbutton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '3%',
    flex: 1,
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',

    justifyContent: 'center',
  },
  forgetpasswordview: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%',
  },
  forgetpasstext: {
    fontSize: 18,
    color: Colors.forgetPassowrdcolor,
    fontFamily: 'OpenSans-Bold',
  },
  resettext: {
    fontSize: 18,
    color: Colors.resesttTextColor,
    fontFamily: 'OpenSans-Bold',
  },
});
