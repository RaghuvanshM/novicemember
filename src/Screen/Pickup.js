import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Animated, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getPickupAddress } from '../module/selectors'
import AnDesign from 'react-native-vector-icons/AntDesign'
const { height, width } = Dimensions.get('screen')
const PickUpLocation = () => {
    const navigation = useNavigation()
    const [lat, setLat] = useState(28.579660)
    const [lng, setLng] = useState(77.321110)
    const pickupAddress = useSelector(getPickupAddress)
    const [animateValue] = useState(new Animated.Value(0))
    const [animatedButton] = useState(new Animated.Value(height))
    const isfocused = useIsFocused()
    const moveview = () => {
        Animated.timing(animateValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start()

    }
    useEffect(() => {
        if (isfocused) {
            Animated.timing(animateValue, {
                toValue: 0.14,
                duration: 1000,
                useNativeDriver: false
            }).start()
               Animated.timing(animatedButton, {
                toValue: height/1.2,
                duration: 2000,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(animateValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start()
            Animated.timing(animatedButton, {
                toValue: height,
                duration: 2000,
                useNativeDriver: false
            }).start()
        }
    }, [isfocused])
    return (
        <>
            <Animated.View style={{ flex: animateValue }}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 20 }}
                        onPress={() => { navigation.goBack() }}
                    >
                        <AnDesign
                            name={'left'}
                            size={20}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pick-Up</Text>
                    </View>
                </View>
                < View style={styles.currentlocationview}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>

                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}
                        onPress={() => { moveview() }}
                    >
                        <TextInput
                            placeholder={'Search '}
                            defaultValue={pickupAddress}
                            style={styles.texinput}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={false}
                zoomEnabled={true}
                zoomControlEnabled={true}
                //  onRegionChangeComplete={(region)=>{onChangeRegion(region)}}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0421,
                }}>



                <Marker
                    coordinate={{ latitude: lat, longitude: lng }}
                   
                />
            </MapView>
            <TouchableOpacity style={{...styles.buttonstyle,top:animatedButton}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Confirm Location</Text>
            </TouchableOpacity>
        </>
    )
}
export default PickUpLocation;
const styles = StyleSheet.create({
    currentlocationview: {
        height: 50,
        width: width * 0.9,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 5,

    },
    buttonstyle: {
        height: 50,
        width: width * 0.8,
        backgroundColor: '#f63869',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    },
    texinput: {
        marginLeft: 10
    }
})