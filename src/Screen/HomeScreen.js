import React, { Component, useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import Geolocation from '@react-native-community/geolocation';
import FontAwesomeicon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeNab from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userCurrntAddress } from '../module/actions';
import { useSelector } from 'react-redux';
import { getDropUpLocation, getPickUpLocation, getUserProfile } from '../module/selectors';
import Button from '../component/Button/Button'
import iconlist from '../module/utils/icon';
import Colors from '../module/utils/Colors';
import { color } from 'react-native-reanimated';
import MapMarkerAutoZoom from '../component/MapComponent/MapMarker';
Mapmyindia.setRestApiKey('zdjgknl2e9nzcw8q6rrcrhz1sctwokdn');
Mapmyindia.setClientId(
  '33OkryzDZsL03Z-bBPJgzrb4MUJ2XpZbD9NtqVb90bUpjgubu-ZnRgkKvNRQDXVNJXw1wdt7oZZ-I2yMzeMq9nN4_VVedCvEtYf3Q6ThXUagSDZdLFYRZQ==',
);
Mapmyindia.setClientSecret(
  'lrFxI-iSEg8ndsP7uuuRF9qAvS_LLzvkypAfjTIis5DbPmgmCBpScspI7b3W_icHkUqdfx4tVRUG-de5sT8GlrlBrEYpC2nhemjFVYfsHr7mZXh_i3BZMW6gzZXKC7df',
);

// Mapmyindia.setRestApiKey('fd71f2fca3ad037476a7e60578781332');
// Mapmyindia.setClientId(
//   '33OkryzDZsIhmErSxmwo58fYiIPy0ygR_1sgZKUrqYvvfHKs1tL6EObMcTN2e1amwNd8-pcmwIS52ZDRd9EVARux6jIw5r6y',
// );
// Mapmyindia.setClientSecret(
//   'lrFxI-iSEg_xbuuT88UEo2qJJrev19WqYysM1FJnjkY4fJnudZLaENHwlm1N4R1h0l4Cg-dk9nxEty4TNRtkuKDNc5BYddkw6Uhn7v3cHCA='
// );
const HomeScreen = () => {
  const [currentlat, setCurrentLat] = useState(0);
  const [currentlong, setCurrentLong] = useState(0);
  const [address, setAddress] = useState('');
  const [wish, setWish] = useState('');
  const navigation = useNavigation();
  const [makers, setMarker] = useState([{
    title: 'hello',
    coordinates: {
      latitude: 28.598810,
      longitude: 77.309677,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
    },
  },
  {
    title: 'hello',
    coordinates: {
      latitude:28.535517,
      longitude:77.391029,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
    },
  }])


  const dispatch = useDispatch()
  const profile = useSelector(getUserProfile)
  const pickAddress = useSelector(getPickUpLocation)
  const dropAddress = useSelector(getDropUpLocation)
  const getlocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then(location => {
        // this.setState({
        //     currentlat: location.latitude,
        //     currentlong: location.longitude

        // })
        setCurrentLat(currentlat);
        setCurrentLong(currentlong);
      })
      .catch(error => {
        const { code, message } = error;
       
      });
  };
  useEffect(() => {

    Geolocation.getCurrentPosition(position => {
      Mapmyindia.rev_geocode(
        { lat: position.coords.latitude, lng: position.coords.longitude },
        response => {
          if (response) {
         
            // this.setState({
            //     address: response.results[0].formatted_address,
            // });
            setAddress(response.results[0].formatted_address);
            dispatch(userCurrntAddress(response.results[0].formatted_address))
          } else {
            // this.setState({
            //     isAddressMOdalvisiable: true,
            //     formatted_address: 'No Address found'
            // });
          }
        },
      );
    });
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setWish('GOOD MORNING');
    } else if (curHr < 18) {
      setWish('GOOD AFTERNOON');
    } else {
      setWish('GOOD EVENING');
    }

  }, []);
  const pressPickUpLocation = () => {
    navigation.navigate('searchresultpage', { screen: 'pickupsscreen' })
  };
  const pressDropLocation = () => {
    navigation.navigate('searchresultpage', { screen: 'dropupscreen' })
  };
  const onNextButtonPress = () => {
    navigation.navigate('cablistscreen')
    // Mapmyindia.route_adv({ source: '28.111,77.111', destination: '28.22,77.22' }, (response) => {
    //   console.log(response)
    // });
  }


  return (
    <View style={styles.MainContainer}>
      <MapMarkerAutoZoom
        data={makers}
      />
      <TouchableOpacity style={styles.upperview}
        onPress={() => { navigation.openDrawer() }}
      >
        <FontAwesomeNab
          name={iconlist.navbaricon}
          size={20}
          style={{ marginLeft: '5%' }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }} >
        <TouchableOpacity style={styles.searchview}
          onPress={() => { pressPickUpLocation() }}
        >
          {pickAddress == '' ? <Text style={styles.pickuptext}>Select PickUp Location</Text> :
            <Text numberOfLines={1} style={styles.pickuptext}>{pickAddress}</Text>}
          <FontAwesomeicon
            name="chevron-right"
            color={Colors.drawerscreentext}
            size={20}
            style={{ marginTop: '2%', marginRight: '5%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchview}
          onPress={pressDropLocation}
        >
          {dropAddress == '' ? <Text style={styles.pickuptext}>Select Drop Location</Text> :
            <Text numberOfLines={1} style={styles.pickuptext}>{dropAddress}</Text>
          }
          <FontAwesomeicon
            name="chevron-right"
            color={Colors.drawerscreentext}
            size={20}
            style={{ marginTop: '2%', marginRight: '5%' }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mapviewstyle}>
        <MapMarkerAutoZoom
          data={makers}
          mapStyle={styles.mapStyle}
        />
      </View>
      {dropAddress != '' && pickAddress != '' ?
        <View style={{ marginBottom: '3%' }}>
          <Button
            title={'Next'}

            textStyle={styles.buttontext}
            onPress={onNextButtonPress}
          /></View> : null}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapStyle: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mapviewstyle: {
    flex: 2,
  },
  innermapview: {
    // elevation:2,
    // backgroundColor:'green',
    // height:'90%',
    // width:'80%',
  },
  label: {
    fontSize: 20,
    color: '#38647d',
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  upperview: {
    flex: 0.4,
    marginTop: StatusBar.currentHeight,
  },
  bottomline: {
    borderBottomWidth: 3,
    marginTop: '4%',
    borderBottomColor: '#38647d',
  },
  searchview: {
    backgroundColor: '#e0e0e0',
    flex: 0.4,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '2%'
  },
  pickuptext: {
    fontSize: 22,
    color: Colors.sidbardbackgroundcolor,
    marginLeft: '10%',
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',

    justifyContent: 'center',
  },
});
