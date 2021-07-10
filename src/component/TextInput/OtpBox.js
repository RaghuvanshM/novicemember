import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import Colors from '../../module/utils/Colors';
import CutomButton from '../Button/Button';

const OtpBoxComponent = (props) => {
    return (
        <View style={styles.textinputview}>
            <TextInput
                placeholder={props.placeholder}
                style={styles.textinput}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
            />
        </View>
    );
};
export default OtpBoxComponent;

const styles = StyleSheet.create({
    textinputview: {
        borderWidth: 2,
        width: 60,
        alignSelf: 'center',
        borderColor: Colors.textinputbordercolor,
        borderRadius: 10,
        margin:'4%'
    },
    textinput: {
        fontSize: 18,
    },
});
