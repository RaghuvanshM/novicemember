import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../module/utils/Colors';

const TextBoxLabel = (props) => {
    return (
        <View style={styles.upperview}>
            <Text style={styles.starttext}>
                *
            </Text>
            <Text style={styles.labelstyle}>
                {props.label}
            </Text>
        </View>
    )
}
export default TextBoxLabel
const styles = StyleSheet.create({
    upperview: {
        flexDirection: 'row'
    },
    starttext: {
        fontSize: 18,
        color: Colors.buttoncolor
    },
    labelstyle: {
        fontSize: 20,
        marginLeft: '1%',
        marginBottom: '2%'
    }
})