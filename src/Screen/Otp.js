import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {getPhoneNumber} from '../module/selectors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

const OtpScreen = () => {
  const [otpverify, setOTP] = useState('');
  const navigation = useNavigation();
  const phonenumber = useSelector(getPhoneNumber);
  console.log(phonenumber);
  const confirmVerificationCode = () => {
    if (phonenumber.otp == otpverify) {
        showMessage({
            message: "Simple message",
            type: "success",
          });
          setOTP('')
          navigation.navigate('Registration')
    } else {
        showMessage({
            message: "incorrect otp",
            type: "danger",
          });
    }
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Icon name="arrowleft" size={30} color="black" />
        </View>
      </TouchableOpacity>
      <View style={{flex: 4}}>
        <View style={styles.singletextinput}>
          <Text style={styles.becomedriver}>Enter OTP</Text>
          <TextInput
            label="Enter Otp"
            onChangeText={text => {
              setOTP(text);
            }}
            maxLength={10}
            keyboardType="number-pad"
            value={otpverify}
          />
        </View>
        <TouchableOpacity
          onPress={confirmVerificationCode}
          style={styles.sendotpbutton}>
          <LinearGradient
            colors={['#e83e8c', '#e83e8c', '#e83e8c']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>VERIFY</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  cardview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    marginTop: hp('3%'),
  },
  singletextinput: {
    width: wp('95%'),
    alignSelf: 'center',
    marginTop: hp('10%'),
  },
  linearGradient: {
    padding: 5,
    width: wp('90%'),
    marginTop: hp('5%'),
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  privacypolicy: {
    flexDirection: 'row',
    marginHorizontal: wp('2%'),
    marginTop: hp('2%'),
  },
  becomedriver: {
    fontFamily: 'Montserrat-BlackItalic',
    fontSize: 24,
    alignSelf: 'center',
    color: '#34404b',
    marginBottom: hp('5%'),
  },
});
