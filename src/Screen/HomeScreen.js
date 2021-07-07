import React, { Component, useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userCurrntAddress } from '../module/actions';
import { useSelector } from 'react-redux';
import { getDropUpLocation, getPickUpLocation, getUserProfile } from '../module/selectors';
import Button from '../component/Button/Button'
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
        console.warn(code, message);
      });
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      console.log(position);
      Mapmyindia.rev_geocode(
        { lat: position.coords.latitude, lng: position.coords.longitude },
        response => {
          if (response) {
            console.log(response)
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
    navigation.navigate('searchresultpage',{screen:'pickupsscreen'})
  };
  const pressDropLocation = () => {
    navigation.navigate('searchresultpage',{screen:'dropupscreen'})
  };
  const onNextButtonPress =()=>{
   navigation.navigate('cablistscreen')
  }
  return (
    <View style={styles.MainContainer}>
      <View style={styles.upperview}>
        <Text style={styles.label}>{wish}</Text>
        <Text style={styles.label}>{profile.user.profile.givenName}</Text>
        <View style={styles.bottomline} />
      </View>
      <View style={{ flex: 1 }} >
        <TouchableOpacity style={styles.searchview}
          onPress={() => { pressPickUpLocation() }}
        >
          {pickAddress == '' ? <Text style={styles.pickuptext}>Select PickUp Location</Text> :
            <Text numberOfLines={1} style={styles.pickuptext}>{pickAddress}</Text>}
          <FontAwesomeicon
            name="chevron-right"
            color="#38647d"
            size={25}
            style={{ marginTop: '2%', marginRight: '5%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchview}
        onPress={pressDropLocation}
        >
         {dropAddress==''?<Text style={styles.pickuptext}>Select Drop Location</Text>:
         <Text numberOfLines={1} style={styles.pickuptext}>{dropAddress}</Text>
         }
          <FontAwesomeicon
            name="chevron-right"
            color="#38647d"
            size={25}
            style={{ marginTop: '2%', marginRight: '5%' }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mapviewstyle}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: 27.140221,
            longitude: 81.961082,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{ latitude: 28.57966, longitude: 77.32111 }}
            title={'Location'}
            description={'Driver Location'}
          />
        </MapView>
      </View>
     { dropAddress!='' && pickAddress!='' ?<Button
        title={'Next'}
        style={{ width: '70%', marginTop: '1%', marginBottom: '3%' }}
        textStyle={styles.buttontext}
        onPress={onNextButtonPress}
      />:null}
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
    color: '#38647d',
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
