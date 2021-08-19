import React, { useEffect, useRef, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getDropLocation, getPickUplatlng, getPickUpLocation } from '../../module/selectors';
import MapViewDirections from 'react-native-maps-directions';

const NewMap = () => {
  const origin = useSelector(getPickUpLocation)
  const destination = useSelector(getDropLocation)
  
  const mapRef = useRef();
  // useEffect(() => {


  // })
  const change = () => {
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    })
  }

  return (
    <MapView
      ref={mapRef}
      userLocationUpdateInterval={1000}
      followsUserLocation={true}
      onMapReady={()=>{change()}}
      onPress={() => { change() }}
      style={{ flex: 1 }}
      showsUserLocation={false}

      initialRegion={{
        latitude: origin.lat,
        longitude: origin.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }} >

      {origin && destination && <MapViewDirections
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
      {origin?.lat && <Marker
        coordinate={{
          latitude: origin.lat,
          longitude: origin.lng,
        }}
        identifier='origin'
      />}
      {destination?.lat && <Marker
        coordinate={{
          latitude: destination.lat,
          longitude: destination.lng,
        }}
        identifier='destination'
      />}

    </MapView>
  )
}
export default NewMap;