import React, { Component, useEffect, useRef, useState, useCallback } from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native'
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
export default function (props) {
    const origin2 = { latitude: 27.118731, longitude: 81.974228};
    const destination2 = { latitude: 28.598810, longitude:77.309677 };
    let origin = props.data[0].coordinates
    let destination = props.data[1].coordinates
    const ref = useRef()
    // effects
    const onMapReadyHandler = useCallback(() => {
        if (Platform.OS === 'ios') {
            ref?.current?.fitToElements(false);
        } else {
            ref?.current?.fitToCoordinates([origin, destination], {
                animated: true,
                edgePadding: {
                    top: 150,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
            });
        }
    }, [ref]);

    // UI
    return (

        <MapView
            style={props.mapStyle}
            ref={ref}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            showsCompass={true}
            liteMode={false}
            showsBuildings={true}
            showsTraffic={true}
            showsIndoors={true}
            onMapReady={onMapReadyHandler}
        >
            <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={'AIzaSyA-pOvrefHwsBnK1CLVEGyjOrNcrU-oPAA'}
                strokeWidth={4}
                strokeColor="black"
            />
            <Marker coordinate={origin} title={'Location'}
                description={'Driver Location'} />
            <Marker coordinate={destination} title={'Location'}
                description={'Driver Location'} />
        </MapView>

    );
}