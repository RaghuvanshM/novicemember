import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import images from '../assets/images/image';
import call from 'react-native-phone-call'

import { getDropupAddress, getPickupAddress } from '../module/selectors';
const DriverDetails = (props) => {
    const pickupAddress = useSelector(getPickupAddress)
    const dropUpAddress = useSelector(getDropupAddress)
    console.log(dropUpAddress)
    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.dlText}>DL1RTC1412</Text>
                    <Text style={{ fontSize: 16 }}>White Dzire</Text>
                    <Text style={{ fontSize: 16 }}>{props.route.params.name}</Text>
                </View>
                <View>
                    <View style={styles.imageview}>
                        <Image
                            source={images.person}
                            style={{ height: 80, width: 80 }}
                            resizeMode='contain'
                        />
                    </View>
                    <Image
                        source={images.carimage}
                        style={{ height: 100, width: 100 }}
                        resizeMode='contain'
                    />

                </View>

            </View>
            <View style={styles.shadowContainerStyle}>
                <Text style={styles.pickupText}>{pickupAddress}</Text>

            </View>
            <View style={[styles.shadowContainerStyle, { marginTop: 10 }]}>
                <Text style={styles.pickupText}>{dropUpAddress}</Text>

            </View>
        </ScrollView>
    )
}
export default DriverDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 5,
        padding: 30
    },
    dlText: {
        fontSize: 22,
        fontFamily: 'OpenSans-Bold'
    },
    imageview: {
        height: 80,
        width: 80,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        position: 'absolute',
        right: 70,
        top: 10,
        zIndex: 1,
        overflow: 'hidden'
    },
    shadowContainerStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderBottomWidth: 5,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        padding: 10

    },
    pickupText: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold'
    }

})