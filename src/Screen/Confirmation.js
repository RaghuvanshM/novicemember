import React from 'react';
import {
  ImageBackground, 
  Text,
  StyleSheet, 
  ScrollView, 
  View,
  TextInput,
  TouchableOpacity,
  Image} from 'react-native';
import images from '../assets/images/image';
// import BackgroundImage from '../component/BackgroundImage/BackgroundImage';

const Confirmation = ({navigation}) => {
  return (
  
      <View style={ styles.container }>
        
        <ImageBackground source={images.splashbgimage} style={styles.backgroundImage} >
        
          <View style={ styles.loginForm }>
            
            <Text style={ styles.text }>Login</Text>
              
          </View>
          <View style={styles.inputContainer}>
           
            <TextInput style={styles.inputText}
            placeholder='*Enter Email' />
             <TextInput style={styles.inputText}
            placeholder='*Enter Passward' />
          </View>
          <TouchableOpacity 
          style={styles.loginButton}
          onPress={()=>{
            navigation.navigate('otpscreen')
          }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
};
export default Confirmation

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
  },

  loginForm: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer:{
    padding:20,
    marginTop:20
  },
  inputText:{
    borderBottomWidth:.5
  },
  loginButton:{
    height:35,
    width:'35%',
    backgroundColor:"black",
    justifyContent:'center',
    marginTop:5,
    marginLeft:20,
    borderRadius:15
  },
  loginText:{
    color:'white',
    alignSelf:'center',
    fontSize:14,
    fontWeight:'bold'
  }
  
  
});