import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {phoneAuth, sendOtp} from '../module/actions';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Appconstant from '../Contants/Appconstant';
const OtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  useEffect(() => {
    dispatch(phoneAuth);
  }, [dispatch]);

  const validatePhone = () => {
    return Appconstant.phoneregx.test(phone);
  };
  const sendOtpbuttoncall = async () => {
    try {
      if (validatePhone()) {
        var val = await Math.floor(1000 + Math.random() * 9000);

        const url = `http://2factor.in/API/V1/fce9a032-d8c4-11eb-8089-0200cd936042/SMS/${phone}/${val}`;
        await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res2 => {
            console.log(res2.Status === 'Success');
            if (res2.Status === 'Success') {
              navigation.navigate('Otpverify');
              let data = {phonenumber: phone, otp: val};
              dispatch(sendOtp(data));
            }
          });
      } else {
        navigation.navigate('Otpverify');

      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Icon name="arrowleft" size={30} color="black" />
        </View>
      </TouchableOpacity>
      <View style={{flex: 2}}>
        <Text style={styles.textlabel}>Enter Phone number</Text>
        <View style={styles.singletextinput}>
          <TextInput
            label="Enter Phone Number "
            onChangeText={text => {
              setPhone(text);
            }}
            keyboardType="number-pad"
            onEndEditing={validatePhone}
            maxLength={10}
          />
        </View>
        <TouchableOpacity
          onPress={sendOtpbuttoncall}
          style={styles.sendotpbutton}>
          <LinearGradient
            colors={['#e83e8c', '#e83e8c', '#e83e8c']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>SEND OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OtpScreen;
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
    width:'90%',
    marginTop:'5%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
