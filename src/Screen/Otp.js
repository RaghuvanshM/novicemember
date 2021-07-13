import React, { Component, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getPhoneNumber } from '../module/selectors';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Iconlist from '../module/utils/icon';
import Allimage from '../assets/images/image';
import Colors from '../module/utils/Colors';
import CustomTextInput from '../component/TextInput/OtpBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel';
import CutomButton from '../component/Button/Button';
const OtpScreen = () => {
  const [otpverify, setOTP] = useState('');
  const navigation = useNavigation();
  const phonenumber = useSelector(getPhoneNumber);

  const confirmVerificationCode = () => {
    if (phonenumber.otp == otpverify) {
      showMessage({
        message: 'Simple message',
        type: 'success',
      });
      setOTP('');
      navigation.navigate('Registration');
    } else {
      showMessage({
        message: 'incorrect otp',
        type: 'danger',
      });
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 0.3 }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name={Iconlist.arrowleft} size={30} style={{ margin: '4%' }} />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={Allimage.mobilephone}
          resizeMode="contain"
          style={{ height: '40%', width: '90%' }}
        />
        <Text style={styles.mobiletext}>OTP VERIFICATION</Text>
        <Text style={styles.otpText}>Enter OTP sent to +917895769455</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CustomTextInput placeholder={''} keyboardType={'number-pad'} />
          <CustomTextInput placeholder={''} keyboardType={'number-pad'} />
          <CustomTextInput placeholder={''} keyboardType={'number-pad'} />
          <CustomTextInput placeholder={''} keyboardType={'number-pad'}


          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '5%' }}>
          <Text style={styles.otpText}>Didn't receive the OTP ?</Text>
          <TouchableOpacity><Text style={styles.resendotp}>Resend OTP </Text></TouchableOpacity>
        </View>
        <View>
          <CutomButton title={'Submit'} 
          textStyle={styles.buttontext}
          onPress={()=>{navigation.navigate('Registration')}}

          />
        </View>
      </View>
    </ScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  buttontext: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  mobiletext: {
    fontSize: 18,
    fontFamily: 'OpenSans-Light',
    margin: '2%',
  },
  otpText: {
    fontSize: 18,
    color: Colors.forgetPassowrdcolor,
    fontFamily: 'OpenSans-Bold',
  },
  resendotp: {
    fontSize: 18,
    color: Colors.resesttTextColor,
    fontFamily: 'OpenSans-Bold'
  }
});
