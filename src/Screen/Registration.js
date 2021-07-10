import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Iconlist from '../module/utils/icon';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomTextInput from '../component/TextInput/TextBox';
import CustomTextBoxLabel from '../component/Label/TextBoxLabel';
import { useNavigation } from '@react-navigation/native';
import images from '../assets/images/image';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, formatDistance } from "date-fns";
import CutomButton from '../component/Button/Button';

const Registration = () => {
    const [icon, setIcon] = useState(true);
    const navigation = useNavigation()
    const [isDatePickerVisibl, setisDatePickerVisibl] = useState(false)
    const [dob, setDob] = useState('')
    const showDatePicker = () => {
        setisDatePickerVisibl(true)
    };
    const hideDatePicker = () => {
        setisDatePickerVisibl(false)
    };

    const handleConfirm = (date) => {
        var formattedDate = format(date, "dd-MM-yyyy ");
        setDob(formattedDate)
        hideDatePicker();
    };
   const onNextPress=()=>{
       navigation.navigate('resistrationnext')
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
            >
                <Icon name={Iconlist.arrowleft} size={30} style={{ margin: '4%' }} />
            </TouchableOpacity>
            <View
                style={{ justifyContent: 'center', alignSelf: 'center', flex: 0 }}
            >
                <Image
                    source={images.becommemberimg}
                    resizeMode='contain'
                    style={{ height: 100, width: 300 }}

                />
            </View>
            <View style={{ justifyContent: 'center' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <CustomTextBoxLabel label={'First Name'} />
                </View>
                <CustomTextInput placeholder={'First Name'} />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <CustomTextBoxLabel label={'Last Name'} />
                </View>
                <CustomTextInput placeholder={'Last Name'} />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <CustomTextBoxLabel label={'Enter Email '} />
                </View>
                <CustomTextInput placeholder={'Email'} />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <CustomTextBoxLabel label={'Enter Phone'} />
                </View>
                <CustomTextInput placeholder={'Phone Name'} />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <CustomTextBoxLabel label={'Create Strong Password'} />
                </View>
                <CustomTextInput
                    placeholder={'Password'}
                    isicon={true}
                    iconPress={() => {
                        setIcon(!icon);
                    }}
                    icon={icon}
                />

            </View>
            <View>
                <CutomButton
                    title={'Next'}
                    textStyle={styles.buttontext}
                    onPress={onNextPress}
                />
            </View>
        </ScrollView>
    );
};
export default Registration;

const styles = StyleSheet.create({
    buttontext: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
    
        justifyContent: 'center',
      },
})
