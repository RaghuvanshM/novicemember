import React, { useEffect, useState } from 'react';
import { Text, View, Animated, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList } from 'react-native';
import AnDesign from 'react-native-vector-icons/AntDesign'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDropupAddress, getPickupAddress } from '../module/selectors';
import axios from 'axios';
import { APIUrl } from '../module/utils/api-constants';
import SearchResultComponent from '../component/SearchResultComponent';
import { dropAddress, dropuLatLong } from '../module/actions';
const { height, width } = Dimensions.get('screen')
const DestinationSearch = () => {
    const [lat, setLat] = useState(28.579660)
    const [lng, setLng] = useState(77.321110)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [pridiction, setPridiction] = useState([])
    const [animatedButton] = useState(new Animated.Value(0))
    const isfocused = useIsFocused()
    const [animateValue] = useState(new Animated.Value(0))
    const pickupAddress = useSelector(getPickupAddress)
    const dropupAddress = useSelector(getDropupAddress)

    useEffect(() => {
        if (isfocused) {
          
            Animated.timing(animatedButton, {
                toValue: height / 4,
                duration: 1000,
                useNativeDriver: false
            }).start()
        } else {
          
            Animated.timing(animatedButton, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false
            }).start()
        }
    }, [isfocused])
    const OpenBottomSheet = () => {
        Animated.timing(animateValue, {
            toValue: height - (height / 3),
            duration: 1000,
            useNativeDriver: false
        }).start()

    }
    const CloseBottomSheet = () => {
        Animated.timing(animateValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
     navigation.navigate('bookcab')
    }
    useEffect(() => {
       
        Animated.timing(animateValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start()
    }, [])
    const onPlceAutoSearch = async (text) => {
        axios.get(`${APIUrl.autogooglepalce}input=${text}${APIUrl.atuoOption}`)
            .then((res) => {
           
                setPridiction(res.data.predictions)
            })

    }
  
    return (
        <>
            <Animated.View style={{ height: animatedButton }}>
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Location</Text>
                    </View>
                </View>
                <View style={styles.textinputview}>
                    <TextInput
                        style={styles.textinput}
                        placeholder={'PickUp Location '}
                        defaultValue={pickupAddress}
                        onSubmitEditing={() => { alert('ahjfjsd') }}
                    />
                    <View
                        style={{ borderBottomWidth: 1, borderBottomColor: '#b2b2b2' }}
                    />
                    <TextInput
                        style={styles.textinput}
                        placeholder={'Enter Destination  '}
                        defaultValue={dropupAddress}
                        onChangeText={(text) => { onPlceAutoSearch(text) }}
                        onFocus={() => { OpenBottomSheet() }}
                    />
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
            <Animated.View style={{ ...styles.bottomview, height: animateValue }}>
                <FlatList
                    data={pridiction}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={(item) => <SearchResultComponent item={item}
                     singleItemPress={CloseBottomSheet}
                    />}
                    keyboardShouldPersistTaps={'always'}
                />
            </Animated.View>
        </>
    )
}
export default DestinationSearch;
const styles = StyleSheet.create({
    textinputview: {
        flex: 0.8,
        width: width * 0.9,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8,
    },
    textinput: {
        marginLeft: 20
    },
    bottomview: {

        backgroundColor: 'white',
        elevation: 5,
      


    },
})