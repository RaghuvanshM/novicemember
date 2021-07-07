import React, { Component, useEffect,useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
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
import {useDispatch} from 'react-redux';
import { authUser } from '../module/actions';

const LoginScreen =({props})=> {
  const dispatch = useDispatch();
  const navigation = useNavigation();
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')

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
  useEffect(()=>{
    GoogleSignin.configure({
          webClientId:
            '465592120377-s3fk75qls260d8gmpfjk4f1jusueva4d.apps.googleusercontent.com',
          offlineAccess: true,
        });
  },[])

 const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();
      dispatch(authUser(userinfo.user))
      navigation.navigate('BottomTab');
    } catch (error) {
      console.log(error);

    }
  };

    return (
      <View style={styles.loginview}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={{ padding: 10 }}>
            <Icon name="arrowleft" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, alignSelf: 'center', color: '#343a40' }}>
          {' '}
          Member Login{' '}
        </Text>
        <View style={styles.loginview}>
          <View style={styles.singletextinput}>
            <TextInput
              label="Email"
              onChangeText={text => {
               setEmail(text)
              }}
            />
          </View>

          <View style={styles.singletextinput}>
            <TextInput
              label="Password"
              onChangeText={text => {
              setPassword(text)
              }}
            />
          </View>
          <TouchableOpacity
          onPress={loginButtonClick}
          >
            <LinearGradient
              colors={['#e83e8c', '#e83e8c', '#e83e8c']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Login Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.googleloginbutton}>
          <GoogleSigninButton
            onPress={signIn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          />
        </View>
      </View>
    );
  }

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
  },
});
