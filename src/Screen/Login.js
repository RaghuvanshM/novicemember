import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image, ScrollView } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { api } from '../component/Constant/api';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { authUser } from '../module/actions';
import CutomButton from '../component/Button/Button';
import CustomTextInput from '../component/TextInput/TextBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel'
import Colors from '../module/utils/Colors';
import Iconlist from '../module/utils/icon'
import images from '../assets/images/image';
const LoginScreen = ({ props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginButtonClick = async () => {
    const url = `${api}/memberlogin`;
    let data = {
      email,
      password,
      current_lat: 28.9087,
      current_lat: 70.393983,
    };
    console.log(data);
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'prabhat@cab',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res2 => {
        console.log(res2);
        if (res2.response.status === 'true') {
          showMessage({
            message: res2.response.message,
            type: 'success',
          });
          AsyncStorage.setItem('Driverid', res2.data.uid.toString());
        } else {
          showMessage({
            message: res2.response.message,
            type: 'single line',
          });
          navigation.navigate('BottomTab');
        }
      });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '465592120377-s3fk75qls260d8gmpfjk4f1jusueva4d.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();
      dispatch(authUser(userinfo.user));
      navigation.navigate('BottomTab');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <View style={styles.loginview}>

    //   <TouchableOpacity
    //     onPress={() => {
    //       navigation.goBack();
    //     }}>
    //     <View style={{padding: 10}}>
    //       <Icon name="arrowleft" size={30} color="black" />
    //     </View>
    //   </TouchableOpacity>
    //   <Text style={{fontSize: 20, alignSelf: 'center', color: '#343a40'}}>
    //     {' '}
    //     Member Login{' '}
    //   </Text>
    //   <CustomTextInput />
    //   <View style={styles.loginview}>
    //     <View style={styles.singletextinput}>
    //       <TextInput
    //         label="Email"
    //         onChangeText={text => {
    //           setEmail(text);
    //         }}
    //       />
    //     </View>

    //     <View style={styles.singletextinput}>
    //       <TextInput
    //         label="Password"
    //         onChangeText={text => {
    //           setPassword(text);
    //         }}
    //       />
    //     </View>
    //     {/* <TouchableOpacity
    //       onPress={loginButtonClick}
    //       >
    //         <LinearGradient
    //           colors={['#e83e8c', '#e83e8c', '#e83e8c']}
    //           style={styles.linearGradient}>
    //           <Text style={styles.buttonText}>Login Now</Text>
    //         </LinearGradient>
    //       </TouchableOpacity> *parrentloginiamgetton.Color.Dark}
    //     />
    //   </View>
    // </View>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <TouchableOpacity style={{ flex: 1 }}
      onPress={()=>{navigation.goBack()}}
      >
        <Icon
          name={Iconlist.arrowleft}
          size={30}
          style={{ margin: '4%' }}
        />
      </TouchableOpacity>
      <View style={{ flex: 0 }}>
        <Image
          source={images.parrentloginiamge}
          resizeMode='contain'
          style={{ height: 70, width: '90%' }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <CustomTextBoxLabel
            label={'Enter Email'}
          />
        </View>
        <CustomTextInput
          placeholder={'Email'}
        />
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <CustomTextBoxLabel
            label={'Enter Password'}
          />
        </View>
        <CustomTextInput
          placeholder={'Password '}
        />
        <View>
          <CutomButton
            title={'Login'}
            textStyle={styles.buttontext}

          />
        </View>
        <View style={styles.forgetpasswordview}>
          <Text style={styles.forgetpasstext}>
            Forget Password?
          </Text>
          <Text style={styles.resettext}>
            Reset here
          </Text>
        </View>
      </View>
      <View style={styles.googleloginbutton}>
        <GoogleSigninButton
          style={{ width: wp('90%') }}
          onPress={signIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </View>
    </ScrollView>
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
  loginview: { justifyContent: 'center', flex: 1, alignSelf: 'center' },
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
    flex: 1
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
    marginTop:'3%'

  },
  forgetpasstext: {
    fontSize: 18,
    color: Colors.forgetPassowrdcolor,
    fontFamily: 'OpenSans-Bold'
  },
  resettext: {
    fontSize: 18,
    color: Colors.resesttTextColor,
    fontFamily: 'OpenSans-Bold'
  }
});
