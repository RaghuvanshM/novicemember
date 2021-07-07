import React, {Component, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { phoneAuth } from '../module/actions';

const Confirmation =()=>{
  const navigation = useNavigation()
  const dispatch = useDispatch();

 const OnLoginClicked = () => {
   navigation.navigate('Login');
  };
  const OnRegistraionClicked = () => {
    navigation.navigate('OtpSceen');
  };
 useEffect(()=>{
dispatch(phoneAuth())
 },[])
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <Text style={styles.becomemembertext}>Become A Member</Text>
        </View>
        <TouchableOpacity
          onPress={OnLoginClicked}>
          <LinearGradient
            colors={['#f63869', '#f63869', '#f63869']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ OnRegistraionClicked}
          style={styles.Registrationbutton}>
          <Text style={styles.RegisterText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
export default Confirmation;
const styles = StyleSheet.create({
  imagestyle: {
    height: hp('60%'),
    width: wp('100%'),
  },
  linearGradient: {
    padding: 10,
    width: wp('90%'),
    marginTop: hp('5%'),
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
  Registrationbutton: {
    padding: 5,
    borderWidth: 4,
    borderColor: '#4c669f',
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  RegisterText: {
    color: '#4c669f',
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  becomemembertext: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#34404b',
  },
});
