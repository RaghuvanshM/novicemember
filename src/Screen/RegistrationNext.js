import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import CustomTextInput from '../component/TextInput/TextBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel';
import Iconlist from '../module/utils/icon';
import {useNavigation} from '@react-navigation/native';
import CutomButton from '../component/Button/Button';

import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../module/utils/Colors';
import images from '../assets/images/image';
import BackgroundImage from '../component/BackgroundImage/BackgroundImage';
import CircularTextBoxComponent from '../component/TextInput/CircularTextBox';
const RegistrationNext = () => {
  const navigation = useNavigation();
  const [monthly, setMonthly] = useState(false);
  const [daily, setDaily] = useState(false);
  return (
    <BackgroundImage>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flex: 0.5}}>
          <Icon name={Iconlist.arrowleft} size={30} style={{margin: '4%'}} />
        </TouchableOpacity>

        <View style={{flex: 0}}>
          <Text style={styles.filltext}>Last Step to create Account</Text>
        </View>
        <View style={{justifyContent: 'center', flex: 2}}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <CustomTextBoxLabel label={'Enter Pickup Location'} />
          </View>
          <CircularTextBoxComponent placeholder={' Pickup Location'} />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <CustomTextBoxLabel label={'Enter Drop Location'} />
          </View>

          <CircularTextBoxComponent placeholder={' Drop Location'} />

          <View style={{width: '90%', alignSelf: 'center'}}>
            <CustomTextBoxLabel label={`Children' s Name`} />
          </View>
          <CircularTextBoxComponent placeholder={`Children Name`} />
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              marginLeft: '5%',
              marginVertical: '1%',
              marginBottom: '5%',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                setMonthly(!monthly);
              }}>
              <Text style={styles.monthtext}>Monthly</Text>
              <View style={{justifyContent: 'center', marginLeft: '4%'}}>
                {monthly ? (
                  <Image
                    source={images.checkbox}
                    resizeMode="contain"
                    style={{height: 30, width: 30}}
                  />
                ) : (
                  <Image
                    source={images.unchebox}
                    resizeMode="contain"
                    style={{height: 30, width: 30}}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', marginLeft: '10%'}}
              onPress={() => {
                setDaily(!daily);
              }}>
              <Text style={styles.monthtext}>Daily</Text>
              <View style={{justifyContent: 'center', marginLeft: '10%'}}>
                {daily ? (
                  <Image
                    source={images.checkbox}
                    resizeMode="contain"
                    style={{height: 30, width: 30}}
                  />
                ) : (
                  <Image
                    source={images.unchebox}
                    resizeMode="contain"
                    style={{height: 30, width: 30}}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {daily ? (
            <View>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <CustomTextBoxLabel label={'From Date'} />
              </View>

              <CustomTextInput placeholder={'dd/mm/yy'} />
            </View>
          ) : null}
          <View style={styles.btnContainer}>
            <CutomButton title={'Submit'} textStyle={styles.buttontext} />
          </View>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};
export default RegistrationNext;

const styles = StyleSheet.create({
  filltext: {
    fontSize: 18,
    color: Colors.forgetPassowrdcolor,
    fontFamily: 'OpenSans-Bold',
    alignSelf: 'center',
  },
  buttontext: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',

    justifyContent: 'center',
  },
  monthtext: {
    fontSize: 18,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
