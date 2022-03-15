import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Iconlist from "../module/utils/icon";
import Icon from "react-native-vector-icons/AntDesign";
import CustomTextInput from "../component/TextInput/TextBox";
import CustomTextBoxLabel from "../component/Label/TextBoxLabel";
import { useNavigation } from "@react-navigation/native";
import images from "../assets/images/image";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, formatDistance } from "date-fns";
import CutomButton from "../component/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { memberSignUp, signupclick } from "../module/actions";
import { getSignUpButtonClick } from "../module/selectors/usersignup";
import CircularTextBoxComponent from "../component/TextInput/CircularTextBox";
import BackgroundImage from "../component/BackgroundImage/BackgroundImage";

const Registration = () => {
  const [icon, setIcon] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const isbuttonclick = useSelector(getSignUpButtonClick);

  const onNextPress = async () => {
    dispatch(signupclick());

    let data = await dispatch(
      memberSignUp({
        first_name,
        last_name,
        email,
        mobile,
        password,
      })
    );
  };
  return (
    <>
      {isbuttonclick && (
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
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginTop: 12 }}
            >
              <Icon
                name={Iconlist.arrowleft}
                size={30}
                style={{ margin: "4%" }}
              />
            </TouchableOpacity>
            <Image
              source={images.dummyPerson}
              resizeMode="contain"
              style={{ height: 100, width: 300 }}
            />
          </View>
          <View
            style={{ justifyContent: "center", alignSelf: "center", flex: 0 }}
          >
            <Image
              source={images.becommemberimg}
              resizeMode="contain"
              style={{ height: 100, width: 300 }}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <CustomTextBoxLabel label={"First Name"} />
            </View>
            <CircularTextBoxComponent
              placeholder={"First Name"}
              onChangeText={(text) => setFirstName(text)}
            />
            <View style={{ width: "90%", alignSelf: "center" }}>
              <CustomTextBoxLabel label={"Last Name"} />
            </View>
            <CircularTextBoxComponent
              placeholder={"Last Name"}
              onChangeText={(text) => setLastName(text)}
            />
            <View style={{ width: "90%", alignSelf: "center" }}>
              <CustomTextBoxLabel label={"Enter Email "} />
            </View>
            <CircularTextBoxComponent
              placeholder={"Email"}
              onChangeText={(text) => setEmail(text)}
            />
            <View style={{ width: "90%", alignSelf: "center" }}>
              <CustomTextBoxLabel label={"Enter Phone"} />
            </View>
            <CircularTextBoxComponent
              placeholder={"Phone Name"}
              onChangeText={(text) => setMobile(text)}
            />
            <View style={{ width: "90%", alignSelf: "center" }}>
              <CustomTextBoxLabel label={"Create Strong Password"} />
            </View>
            <CircularTextBoxComponent
              placeholder={"Password"}
              isicon={true}
              iconPress={() => {
                setIcon(!icon);
              }}
              icon={icon}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.btnContainer}>
            <CutomButton
              title={"Next"}
              textStyle={styles.buttontext}
              onPress={onNextPress}
            />
          </View>
        </ScrollView>
      </BackgroundImage>
    </>
  );
};
export default Registration;

const styles = StyleSheet.create({
  buttontext: {
    fontSize: 14,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",

    justifyContent: "center",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
