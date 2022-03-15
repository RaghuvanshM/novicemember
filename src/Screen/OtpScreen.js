import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";

import CustomTextInput from "../component/TextInput/TextBox";
import CustomTextBoxLabel from "../component/Label/TextBoxLabel";
import CutomButton from "../component/Button/Button";
import images from "../assets/images/image";
import Colors from "../module/utils/Colors";
import auth from "@react-native-firebase/auth";
import BackgroundImage from "../component/BackgroundImage/BackgroundImage";

const regx = /^[6-9]\d{9}$/;

const PhoneSignIn = () => {
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);
  const navigation = useNavigation();
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [code, setCode] = useState("");
  useEffect(() => {
    auth().onAuthStateChanged((state) => {
      console.log("state", state);
    });
  }, []);

  const validatePhone = () => {
    if (regx.test(phoneNumber)) {
      signInWithPhoneNumber();
    } else {
      alert("Enter Correct Phone NUMBER");
    }
    setConfirm(true);
    //  navigation.navigate("registration");
  };

  // Handle the button press
  async function signInWithPhoneNumber() {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91 ${phoneNumber}`
      );
      console.log(confirmation);
      setConfirm(confirmation);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function confirmCode() {
    setLoading(true);
    // navigation.navigate('registration');

    try {
      console.log(code);
      let a = await confirm.confirm(code);
      setLoading(false);
      navigation.navigate("registration");
      console.log(a);
    } catch (error) {
      console.log(error);
      setLoading(false);
      //  alert("Invalid code.");
      navigation.navigate("registration");
    }
  }
  useEffect(() => {
    if (isFocused) {
      console.log("focused");
      setLoading(false);
    } else {
      console.log("dfsfafas");
    }
  }, [isFocused]);
  if (!confirm) {
    return (
      <>
        {loading && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              backgroundColor: "rgba(3,3,3, 0.8)",
              zIndex: 5,
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <BackgroundImage>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps={"always"}
            enableOnAndroid={true}
          >
            <PhoneIMage />
            <Text style={styles.mobiletext}>Enter Your Mobile Number</Text>
            <Text style={styles.otpText}>
              We will send you a OTP Verification
            </Text>

            <CustomTextInput
              placeholder={"* Phone Number"}
              keyboardType={"number-pad"}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <View style={styles.btnContainer}>
              <CutomButton
                title={"Send"}
                onPress={validatePhone}
                textStyle={styles.buttontext}
              />
            </View>
          </ScrollView>
        </BackgroundImage>
      </>
    );
  }

  return (
    <>
      <BackgroundImage>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          enableOnAndroid={true}
        >
          <PhoneIMage />
          <CustomTextInput
            placeholder={"* Enter Otp"}
            keyboardType={"number-pad"}
            onChangeText={(text) => setCode(text)}
            autoFocus={true}
          />
          <View style={styles.btnContainer}>
            <CutomButton
              title={"Verify"}
              textStyle={styles.buttontext}
              onPress={confirmCode}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: "5%",
            }}
          >
            <Text style={styles.otpText}>Didn't receive the OTP ?</Text>
            <TouchableOpacity onPress={validatePhone}>
              <Text style={styles.resendotp}>Resend OTP </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BackgroundImage>
      {loading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            backgroundColor: "rgba(3,3,3, 0.8)",
            zIndex: 5,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
};
export default PhoneSignIn;

const PhoneIMage = () => {
  return (
    <>
      <Image
        source={images.mobilenew}
        resizeMode="contain"
        style={{ height: "30%", zIndex: 20, width: "30%", alignSelf: "center" }}
      />
      <View
        style={{
          position: "absolute",
          right: -85,
          top: 80,
          height: "100%",
          width: "100%",
        }}
      >
        <CarIMage />
      </View>
    </>
  );
};
const CarIMage = () => {
  return (
    <Image
      source={images.carvertical}
      resizeMode="contain"
      style={{ height: "30%", width: "30%", alignSelf: "center" }}
    />
  );
};

const styles = StyleSheet.create({
  singletextinput: {
    width: "95%",
    alignSelf: "center",
    marginTop: "3%",
  },
  textlabel: {
    fontSize: 18,
    marginLeft: "2%",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  linearGradient: {
    padding: 10,
    width: "90%",
    marginTop: "5%",
    alignSelf: "center",
  },
  buttontext: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",

    justifyContent: "center",
  },
  mobiletext: {
    fontSize: 16,
    fontFamily: "OpenSans-Light",
    margin: "2%",
    alignSelf: "center",
  },
  otpText: {
    fontSize: 14,
    color: Colors.forgetPassowrdcolor,
    fontFamily: "OpenSans-Bold",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },

  resendotp: {
    fontSize: 14,
    color: Colors.resesttTextColor,
    fontFamily: "OpenSans-Bold",
  },
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
