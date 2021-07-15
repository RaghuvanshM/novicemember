import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Entypodesign from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Iconlist from '../module/utils/icon'
import ArrowLeft from 'react-native-vector-icons/AntDesign';

import images from '../assets/images/image';
import {getUserProfile} from '../../src/module/selectors';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { signOutUser} from '../module/actions';
import Colors from '../module/utils/Colors';
// import { connect } from 'react-redux'
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector(getUserProfile);
  const [islogin, setLogin] = useState(profile.user.isAuth);
  // signout from gamil
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(signOutUser());
      navigation.navigate('Login');
    } catch (error) {

    }
  };
  useEffect(()=>{
    GoogleSignin.configure({
      webClientId:
        '465592120377-s3fk75qls260d8gmpfjk4f1jusueva4d.apps.googleusercontent.com',
      offlineAccess: true,
    });
  },[])
  return (
    <View style={styles.base}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="white"
      />
      <View style={styles.headerText}>
        <View style={{flexDirection: 'row', padding: '1%'}}>
        <TouchableOpacity
            style={{ flex: 0.2, alignSelf: 'center' }}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft name={Iconlist.arrowleft} size={30} />
          </TouchableOpacity>
          {islogin ? (
            <View>
              {profile.user.isAuth ? (
                <Image
                  source={{uri: profile.user.profile.photo}}
                  style={{height: 70, width: 80, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={images.dummy}
                  style={{height: 70, width: 80, resizeMode: 'contain'}}
                />
              )}
            </View>
          ) : null}
          {islogin ? (
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.nametext}>{profile.user.profile.name}</Text>
              <Text style={styles.emailtext}>{profile.user.profile.email}</Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '3%',
          }}>
          <Text></Text>
          <View>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={signOut}>
              <Entypodesign
                name="log-out"
                color={Colors.sidbardbackgroundcolor}
                size={30}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: `${Colors.sidbardbackgroundcolor}`,
                  marginHorizontal: '2%',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.menuitem}>
        <MaterialIcon
          name="feedback"
          color={Colors.sidbardbackgroundcolor}
          size={20}
          style={{padding: 20}}
        />
        <Text style={styles.feedbacktext}>Feedback</Text>
      </View>
      <View style={styles.menuitem}>
        <Feather
          name="phone"
          color={Colors.sidbardbackgroundcolor}
          size={20}
          style={{padding: 20}}
        />
        <Text style={styles.feedbacktext}>Contact Us</Text>
      </View>
      <View style={styles.menuitem}>
        <Entypodesign
          name="help"
          color={Colors.sidbardbackgroundcolor}
          size={20}
          style={{padding: 20}}
        />
        <Text style={styles.feedbacktext}>Help</Text>
      </View>
      <View style={styles.menuitem}>
        <MaterialIcon
          name="support"
          color={Colors.sidbardbackgroundcolor}
          size={20}
          style={{padding: 20}}
        />
        <Text style={styles.feedbacktext}>Support</Text>
      </View>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  base: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  headerText: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 5,
    width: '100%',
  },
  nametext: {
    fontSize: 16,
    color:Colors.sidbardbackgroundcolor,
    fontWeight: 'bold',
  },
  emailtext: {
    fontSize: 16,
    color:Colors.sidbardbackgroundcolor,
  },
  feedbacktext: {
    fontSize: 20,
    color:Colors.sidbardbackgroundcolor,
    marginLeft: 30,
    padding: 20,
  },
  menuitem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 2,
  },
});
