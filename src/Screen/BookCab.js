import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Animated, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getDropLocation, getPickupAddress, getPickUpLocation } from '../module/selectors'
import AnDesign from 'react-native-vector-icons/AntDesign'
import RouteIcon from 'react-native-vector-icons/FontAwesome5'
import FullScreenIcon from 'react-native-vector-icons/MaterialIcons'
import CabListScreen from './CabList';
import MapViewDirections from 'react-native-maps-directions';

const { height, width } = Dimensions.get('screen')
const PickUpLocation = () => {
    const navigation = useNavigation()
    const mapRef = useRef();
    const [lat, setLat] = useState(28.579660)
    const [lng, setLng] = useState(77.321110)
    const pickupAddress = useSelector(getPickupAddress)
    const [animateValue] = useState(new Animated.Value(0))
    const [animatedButton] = useState(new Animated.Value(height))
    const [animatedIcon] = useState(new Animated.Value(height / 1.5))
    const [isFullScreen, setFullScreen] = useState(false)
    const origin = useSelector(getPickUpLocation)
    const destination = useSelector(getDropLocation)
   
    const isfocused = useIsFocused()

    const moveview = () => {
        Animated.timing(animateValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
        Animated.timing(animatedIcon, {
            toValue: height / 9,
            duration: 2000,
            useNativeDriver: false
        }).start()
    }
    const moveTop =()=>{
        Animated.timing(animateValue, {
            toValue: 2,
            duration: 1000,
            useNativeDriver: false
        }).start()
        Animated.timing(animatedIcon, {
            toValue: height / 1.5,
            duration: 2000,
            useNativeDriver: false
        }).start()
    }
    useEffect(() => {
        setLat(origin.lat)
        setLng(origin.lng)
    }, [origin, destination])
    useEffect(() => {
        if (isfocused) {
            setFullScreen(true)
            change()
            Animated.timing(animateValue, {
                toValue: 2,
                duration: 2000,
                useNativeDriver: false
            }).start()
            Animated.timing(animatedButton, {
                toValue: height / 1.2,
                duration: 2000,
                useNativeDriver: false
            }).start()
            Animated.timing(animatedIcon, {
                toValue: height / 1.5,
                duration: 2000,
                useNativeDriver: false
            }).start()
        } else {
            change()
            setFullScreen(true)
            Animated.timing(animateValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start()
            Animated.timing(animatedButton, {
                toValue: height,
                duration: 1000,
                useNativeDriver: false
            }).start()
        }
    }, [isfocused])
    const change = () => {
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        })
    }
    const fullscreen = () => {
        moveview()
        setFullScreen(false)
    }
    const exitFullScreen = () => {
        moveTop()
        setFullScreen(true)
    }
 
    return (
        <>


            <MapView
                style={{ flex: 1 }}

                showsUserLocation={false}
                ref={mapRef}
                zoomEnabled={true}
                zoomControlEnabled={true}
                //  onRegionChangeComplete={(region)=>{onChangeRegion(region)}}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0421,
                }}>
                {origin !== '' && destination !== '' && <MapViewDirections
                    origin={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    destination={{
                        latitude: destination.lat,
                        longitude: destination.lng,
                    }}
                    apikey={'AIzaSyA-pOvrefHwsBnK1CLVEGyjOrNcrU-oPAA'}
                    strokeWidth={4}
                    strokeColor="black"
                />}

                {origin !== '' && <Marker
                    coordinate={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    identifier='origin'
                />}
                {destination != '' && <Marker
                    coordinate={{
                        latitude: destination.lat,
                        longitude: destination.lng,
                    }}
                    identifier='destination'
                />}

            </MapView>
            <TouchableOpacity style={{ ...styles.arroleftview, bottom: height / 1.2 }}
                onPress={() => navigation.goBack()}
            >
                <AnDesign
                    name={'left'}
                    size={25}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.arroleftview, bottom: height / 1.35 }}
                onPress={() => change()}
            >
                <RouteIcon
                    name={'route'}
                    size={25}
                />
            </TouchableOpacity>
            <Animated.View
                style={{ ...styles.arroleftview, bottom: animatedIcon }}

            >
                {isFullScreen ? <TouchableOpacity
                    onPress={() => fullscreen()}
                >
                    <FullScreenIcon
                        name={'fullscreen'}
                        size={25}
                    />
                </TouchableOpacity> :
                    <TouchableOpacity
                    onPress={() => exitFullScreen()}
                    >
                        <FullScreenIcon
                            name={'fullscreen-exit'}
                            size={25}
                        />
                    </TouchableOpacity>}
            </Animated.View>
            <Animated.View style={{ ...styles.bottomview, flex: animateValue }}>
                <CabListScreen
                    onPress={() => { change() }}

                />

            </Animated.View>

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
    arroleftview: {
        height: 50,
        width: 50,
        borderRadius: 25,
        elevation: 5,
        backgroundColor: 'white',
        position: 'absolute',
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'


    },
    texinput: {
        marginLeft: 10
    }
})


