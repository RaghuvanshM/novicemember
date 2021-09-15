import React, { useState } from 'react';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import images from '../assets/images/image';
import Button from '../component/Button/Button';
import Colors from '../module/utils/Colors';
import data from '../Contants/data';
import { useDispatch, useSelector } from 'react-redux';
import { getDropLocation, getPickupAddress, getPickUpLocation, getProfileByEmail } from '../module/selectors';
import { BookCab } from '../module/actions';
import { Color } from 'chalk';
const { height, width } = Dimensions.get('screen')
const CabListScreen = ({ onPress }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    var dateandtime = new Date()
    const getProfiledetail = useSelector(getProfileByEmail)
    const destination = useSelector(getDropLocation)
    const origin = useSelector(getPickUpLocation)
    const pickupAddress = useSelector(getPickupAddress)
    const singleItemPress = (item, index) => {
        setItemIndex(index)
    }
    const onConfirPress = () => {
        alert('he;')

        dispatch(BookCab(
            {
                'pickup_user_name': getProfiledetail?.name,
                'pickup_phone_number': getProfiledetail?.mobile,
                'pickup_location': pickupAddress,
                'pickup_lat': origin?.lat,
                'pickup_long': origin?.lng,
                'pickup_date': dateandtime.toLocaleDateString(),
                'pickup_time': dateandtime.toLocaleTimeString(),
                'dropoff_location': 'Noida Sector 62',
                'dropoff_lat': destination?.lat,
                'dropoff_long': destination?.lng,
                'id_user': getProfiledetail?.id_user,
                'transport': 'mini'

            }
        ))
        navigation.navigate('findingdriver')
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ ...styles.itemstyle1 }}
                onPress={() => { singleItemPress(item, index) }}
            >
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Image
                        source={item.cariimage}
                        style={styles.carimage}
                        resizeMode='contain'
                    />
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={styles.cabname}>{item.cabname}</Text>
                        <Text style={styles.droptime}>{`${item.droptime} dropoff `}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', padding: 20 }}>
                    <Text style={styles.cabname}>{` ₹  ${item.price}`}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
            />
            <View style={styles.bottomButton}>
                <Text style={styles.rupeesStyle}>&#8377;38.90</Text>
                <TouchableOpacity
                    style={styles.bookingButton}
                    onPress={() => { onConfirPress() }}
                >
                    <Text style={styles.bookText}>Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CabListScreen;

const styles = StyleSheet.create({
    mapStyle: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    carimage: {
        height: 100,
        width: 100
    },
    cabname: {
        fontSize: 16,
        color: Colors.sidbardbackgroundcolor,
        fontWeight: 'bold'
    },
    droptime: {
        color: Colors.screentextColor
    },
    buttontext: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',

        justifyContent: 'center',
    },
    itemstyle: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    itemstyle1: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.selecteditmeback
    },
    bottomButton: {
        height: 100,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rupeesStyle: {
        fontSize: 24,
        fontFamily: 'OpenSans-Bold'

    },
    bookingButton: {
        backgroundColor: Colors.buttoncolor,
        height: 50,
        width: width * 0.3,
        justifyContent: 'center',
        alignItems: 'center'

    },
    bookText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'OpenSans-Bold'

    }
});
