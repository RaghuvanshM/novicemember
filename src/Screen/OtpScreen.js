import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import CustomTextInput from '../component/TextInput/TextBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel'
import CutomButton from '../component/Button/Button';
import images from '../assets/images/image';
import Colors from '../module/utils/Colors';
import auth from '@react-native-firebase/auth';
import BackgroundImage from '../component/BackgroundImage';

const regx =/^[6-9]\d{9}$/


const PhoneSignIn = () => {

  const navigation = useNavigation()
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()
  const [code, setCode] = useState('');


  const validatePhone =()=>{
    if(regx.test(phoneNumber)){
      signInWithPhoneNumber()
    }
    else{
      alert('Enter Correct Phone NUMBER')
    }
  }

  // Handle the button press
  async function signInWithPhoneNumber() {
    setLoading(true)
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91 ${phoneNumber}`);
      console.log(confirmation)
      setConfirm(confirmation);
      setLoading(false)
    }
    catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  async function confirmCode() {
    setLoading(true)

    try {
      console.log(code)
      let a = await confirm.confirm(code);
      setLoading(false)
      navigation.navigate('registration')
      console.log(a)
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert('Invalid code.');

    }
  }
  useEffect(() => {
    if (isFocused) {
      console.log('focused')
      setLoading(false)
    }
    else {
      console.log('dfsfafas')
    }
  }, [isFocused])
  if (!confirm) {
    return (
      <>
        {loading && <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(3,3,3, 0.8)',
            zIndex: 5,
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>}
        <View style={styles.container}>

          <ScrollView
            contentContainerStyle={{flexGrow:1,justifyContent:'center'}}
            showsVerticalScrollIndicator={false}
            bounces={false}

            keyboardShouldPersistTaps={'always'}
            enableOnAndroid={true}
          >
            <PhoneIMage />
            <Text style={styles.mobiletext}>Enter Your Mobile Number</Text>
            <Text style={styles.otpText}>We will send you a OTP Verification</Text>
            <View style={{ width: '90%', alignSelf: 'center', margin: '2%' }}>
              <CustomTextBoxLabel
                label={'Enter Mobile Number'}
              />

            </View>
            <CustomTextInput
              placeholder={'Phone Number'}
              keyboardType={'number-pad'}
              onChangeText={text => setPhoneNumber(text)}
            />
            <CutomButton
              title={'Send'}
              onPress={validatePhone}
              textStyle={styles.buttontext}

            />
          </ScrollView>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>

        <ScrollView
          contentContainerStyle={{flexGrow:1,justifyContent:'center'}}
          showsVerticalScrollIndicator={false}
          bounces={false}


          enableOnAndroid={true}
        >
          <PhoneIMage />
          <Text style={styles.mobiletext}>OTP VERIFICATION</Text>
          <Text style={styles.otpText}>{`Enter OTP sent to ${phoneNumber}`}</Text>
          <View style={{ width: '90%', alignSelf: 'center', margin: '2%' }}>
            <CustomTextBoxLabel
              label={'Enter Otp'}
            />

          </View>
          <CustomTextInput
            placeholder={'Otp'}
            keyboardType={'number-pad'}
            onChangeText={text => setCode(text)}
            autoFocus={true}
          />
          <CutomButton
            title={'Verify'}
            textStyle={styles.buttontext}
            onPress={confirmCode}

          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '5%' }}>
            <Text style={styles.otpText}>Didn't receive the OTP ?</Text>
            <TouchableOpacity
            onPress={validatePhone}
            ><Text style={styles.resendotp}>Resend OTP </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {loading && <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(3,3,3, 0.8)',
          zIndex: 5,
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>}

    </>
  );
}
export default PhoneSignIn





const PhoneIMage = () => {
  return (
 <ImageBackground  style={{height:'100%',width:'100%'}}
 source={require('../assets/images/otp.png')} resizeMode="contain" />
     
  
  )
}


const styles = StyleSheet.create({
  singletextinput: {
    width: '95%',
    alignSelf: 'center',
    marginTop: '3%',
  },
  textlabel: {
    fontSize: 18,
    marginLeft: '2%',
  },
  linearGradient: {
    padding: 10,
    width: '90%',
    marginTop: '5%',
    alignSelf: 'center',
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',

    justifyContent: 'center',
  },
  mobiletext: {
    fontSize: 16,
    fontFamily: 'OpenSans-Light',
    margin: '2%',
    alignSelf: 'center'
  },
  otpText: {
    fontSize: 14,
    color: Colors.forgetPassowrdcolor,
    fontFamily: 'OpenSans-Bold',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'#f0d677'
  },
 
  resendotp: {
    fontSize: 14,
    color: Colors.resesttTextColor,
    fontFamily: 'OpenSans-Bold'
  }

});

// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';

// function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     console.log(confirmation)
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       console.log(code)
//     let a=  await confirm.confirm(code);
//     console.log(a)
//     } catch (error) {
//       console.log(error)
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+917895769455')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }

// export default PhoneSignIn