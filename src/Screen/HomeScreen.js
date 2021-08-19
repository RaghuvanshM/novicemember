import React, { Component, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
  Image

} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FontAwesomeicon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeNab from 'react-native-vector-icons/Fontisto'
import CurrenLocation from 'react-native-vector-icons/Ionicons'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { pickupLatLong, dropuLatLong, convertLatlng, dropAddress, getAllDriver } from '../module/actions';
import { useSelector } from 'react-redux';
import { getDropLocation, getDropupAddress, getNearByDriver, getPickupAddress, getPickUpLocation, getUserProfile } from '../module/selectors';
import Button from '../component/Button/Button'
import iconlist from '../module/utils/icon';
import Colors from '../module/utils/Colors';
import SliderScreen from '../component/slider/slider';
import images from '../assets/images/image';
import AppIntroSlider from 'react-native-app-intro-slider';
const { height, width } = Dimensions.get('screen')
const HomeScreen = () => {
  const [pickup, setPickup] = useState('')
  const [dropup, setDropup] = useState('')
  const isfocused = useIsFocused()

  const [animateValue] = useState(new Animated.Value(0))
  const [lat, setLat] = useState(28.579660)
  const [lng, setLng] = useState(77.321110)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const pickupAddress = useSelector(getPickupAddress)
  const dropUpAddress = useSelector(getDropupAddress)
  const origin = useSelector(getPickUpLocation)
  const destination = useSelector(getDropLocation)
  const profile = useSelector(getUserProfile)
  const [id_user] = useState(profile.id_user)
  const listofdriver = useSelector(getNearByDriver)
  const mapRef = useRef();

  const getlocation = async () => {
    await Geolocation.getCurrentPosition(info => {
      setLat(info.coords.latitude)
      setLng(info.coords.longitude)
      dispatch(pickupLatLong({ lat: info.coords.latitude, lng: info.coords.longitude }))
      dispatch(convertLatlng({ lat: info.coords.latitude, long: info.coords.longitude }))
    });
  };

  const pressPickUpLocation = () => {
    navigation.navigate('searchresultpage')
  }
  const moveview = () => {
    Animated.timing(animateValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false
    }).start()
    navigation.navigate('pickulocatioin')
  }
  useEffect(() => {
    dispatch(getAllDriver({ id_user, pickup_lat: 24.7654, pickup_long: 74.345778 }))
    getlocation()
    Animated.timing(animateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start()
    dispatch(dropAddress(''))
  }, [])
  useEffect(() => {
    if (isfocused) {
      
      Animated.timing(animateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }).start()

    } else {
      
      Animated.timing(animateValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }).start()
    }
  }, [isfocused])
  const destinationPress = () => {
    Animated.timing(animateValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false
    }).start()
    navigation.navigate('destination')
  }

  const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };

  const fitAllMarkers = () => {
    mapRef.current.fitToCoordinates(listofdriver, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }
  return (
    <>


      <View style={styles.currentlocationview}>
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.upperview}
            onPress={() => { navigation.openDrawer() }}
          >
            <FontAwesomeNab
              name={iconlist.navbaricon}
              size={16}
              style={{ marginLeft: '5%' }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}
          onPress={() => { moveview() }}
        >
          <Text numberOfLines={1}>
            {pickupAddress}
          </Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        onMapReady={() => { fitAllMarkers() }}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        onPanDrag={() => { moveview() }}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0421,
        }}>

        {listofdriver && listofdriver.map((marker, i) => (
          <Marker key={i} identifier={`id${i}`} coordinate={marker}

          >

          </Marker>
        ))}
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          title={"JavaTpoint"}
          description={"Java Training Institute"}
        />
        {/* {listofdriver && listofdriver.map((a)=>{
 <Marker
 coordinate={{ latitude: lat, longitude: lng }}
 title={"JavaTpoint"}
 description={"Java Training Institute"}
/>
})} */}

      </MapView>
      <Animated.View style={{ ...styles.bottomview, flex: animateValue }}>

        <Pressable style={styles.searchbarstyle}
          onPress={() => { destinationPress() }}
        >
          <FontAwesomeicon
            size={20}
            name={'search'}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.destinationText}>Search Destination</Text>
        </Pressable>
        <View style={{
          marginTop: 60, 
          flex:1
        
        }}

        >
        <SliderScreen />
        </View>
      </Animated.View>
      <TouchableOpacity style={{
        height: 50, width: 50, backgroundColor: 'white',
        position: 'absolute', top: height / 4, left: width * 0.85,
        borderRadius: 30,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
      }}
        onPress={() => fitAllMarkers()}
      >
        <CurrenLocation
          name={'locate-outline'}
          size={30}
        />
      </TouchableOpacity>
    </>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  currentlocationview: {
    height: 50,
    width: width * 0.9,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  bottomview: {

    backgroundColor: 'white',
    elevation: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20

  },
  animatedcircle: { height: 100, width: 100, borderRadius: 50, backgroundColor: 'red' },
  searchbarstyle: {
    width: width * 0.9,
    backgroundColor: '#f3f5f4',
    alignSelf: 'center',
    padding: 15,
    marginTop: 20,
    borderRadius: 6,
    flexDirection: 'row'
  },
  destinationText: {
    fontSize: 20
  }

})