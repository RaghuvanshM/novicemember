import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import images from '../assets/images/image';
import TextBoxComponent from '../component/TextInput/TextBox';
import CustomeButton from '../component/Button/Button';
import BackgroundImage from '../component/BackgroundImage/BackgroundImage';
const Confirmation = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const loginButtonClick = () => {};
  return (
    <>
      <StatusBar hidden />
      <BackgroundImage>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <TextBoxComponent
            placeholder={'* Enter Email'}
            onChangeText={text => setEmail(text)}
          />
          <TextBoxComponent
            placeholder={'* Enter Password'}
            onChangeText={text => setEmail(text)}
          />
          <View style={styles.buttonView}>
            <CustomeButton
              title={'Login'}
              textStyle={styles.buttonText}
              onPress={() => {
                loginButtonClick();
              }}
            />
            <CustomeButton
              title={'Signup'}
              textStyle={styles.buttonText}
              onPress={() => {
                navigation.navigate('otpscreen');
              }}
            />
          </View>
        </ScrollView>
      </BackgroundImage>
    </>
  );
};
export default Confirmation;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 20,
  },
});
