import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { phoneAuth, sendOtp } from '../module/actions';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Appconstant from '../Contants/Appconstant';
import Iconlist from '../module/utils/icon';
import CustomTextInput from '../component/TextInput/TextBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel'
import CutomButton from '../component/Button/Button';
import images from '../assets/images/image';
import Colors from '../module/utils/Colors';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const navigation = useNavigation()
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('')
  // Handle the button press
  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91 ${phone}`);
      console.log(confirmation)
      setConfirm(confirmation);
    }
    catch (e) {
      console.log(e)
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);

    } catch (error) {
      console.log('Invalid code.');
    }
  }
  useEffect(() => {
    console.log(confirm)

  })
  if (!confirm) {
    return (
      <View style={styles.container}>
        <ArrowleftICON />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardAvoidingContainer}
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
            onChangeText={text => setPhone(text)}
          />
          <CutomButton
            title={'Send'}
            onPress={signInWithPhoneNumber}
            textStyle={styles.buttontext}

          />
        </KeyboardAwareScrollView>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ArrowleftICON />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardAvoidingContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}

          keyboardShouldPersistTaps={'always'}
          enableOnAndroid={true}
        >
          <PhoneIMage />
          <Text style={styles.mobiletext}>OTP VERIFICATION</Text>
          <Text style={styles.otpText}>Enter OTP sent to +917895769455</Text>
          <View style={{ width: '90%', alignSelf: 'center', margin: '2%' }}>
            <CustomTextBoxLabel
              label={'Enter Otp'}
            />

          </View>
          <CustomTextInput
            placeholder={'Otp'}
            keyboardType={'number-pad'}
            onChangeText={text => setCode(text)}
          />
          <CutomButton
            title={'Verify'}
            textStyle={styles.buttontext}
            onPress={confirmCode}

          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '5%' }}>
            <Text style={styles.otpText}>Didn't receive the OTP ?</Text>
            <TouchableOpacity><Text style={styles.resendotp}>Resend OTP </Text></TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
export default PhoneSignIn



const ArrowleftICON = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => { navigation.goBack() }}
      >
        <Icon
          name={Iconlist.arrowleft}
          size={30}
          style={{ margin: '4%' }}
        />
      </TouchableOpacity>
    </View>
  )
}

const PhoneIMage = () => {
  return (
    <Image
      source={images.mobilephone}
      resizeMode='contain'
      style={{ height: 70, width: 70, alignSelf: 'center' }}
    />
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
    flex: 1
  },
  keyboardAvoidingContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  resendotp: {
    fontSize: 14,
    color: Colors.resesttTextColor,
    fontFamily: 'OpenSans-Bold'
  }

});