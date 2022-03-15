import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from "react-native";
import images from "../assets/images/image";
import TextBoxComponent from "../component/TextInput/TextBox";
import CustomeButton from "../component/Button/Button";
import BackgroundImage from "../component/BackgroundImage/BackgroundImage";
import { authUser, loginButtonPress, loginSuccess } from "../module/actions";
import messaging from "@react-native-firebase/messaging";
import { useDispatch } from "react-redux";
import { signInApi } from "../module/utils/Apis/user";
import { APIUrl } from "../module/utils/api-constants";
import Toast from "react-native-simple-toast";
import NoauthStack from "../router/NoAuthRoutes";

const Confirmation = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginButtonClick = async () => {
    let token = await messaging().getToken();
    // dispatch(loginButtonPress());
    // dispatch(authUser({ Email, Email, token }));
    // dispatch(loginSuccess());
    let payload = { email: Email, password: Password, token };
    let Result = await signInApi(APIUrl.login, payload);
    if (Result.data.response.status == true) {
      Toast.show(Result.data.response.message);
      dispatch(loginSuccess());
    } else {
      Toast.show(Result.data.response.message);
    }
  };
  return (
    <>
      <StatusBar hidden />
      <BackgroundImage>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <TextBoxComponent
            placeholder={"* Enter Email"}
            onChangeText={(text) => setEmail(text)}
          />
          <TextBoxComponent
            placeholder={"* Enter Password"}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonView}>
            <CustomeButton
              title={"Login"}
              textStyle={styles.buttonText}
              onPress={() => {
                loginButtonClick();
              }}
            />
            <CustomeButton
              title={"Signup"}
              textStyle={styles.buttonText}
              onPress={() => {
                navigation.navigate("otpscreen");
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
    fontFamily: "Gill Sans",
    textAlign: "center",
    color: "white",
    backgroundColor: "transparent",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
  },
});
