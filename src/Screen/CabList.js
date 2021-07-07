import React, { useState } from 'react';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import ArrowLeft from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import images from '../assets/images/image';
import Button from '../component/Button/Button'
import Colors from '../module/utils/Colors'
const CabListScreen = () => {
    const navigation = useNavigation();
    const [itemindex, setItemIndex] = useState(null)
    const data = [
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
        {
            cariimage: images.carimage,
            cabname: 'cab1',
            droptime: '11:37',
            price: '38.90',
        },
    ];
    const singleItemPress = (item, index) => {
        setItemIndex(index)
        console.log(index)
    }
    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
                style={itemindex==index?{...styles.itemstyle}:{...styles.itemstyle1}}
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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
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

                    <ArrowLeft
                        name="arrow-left"
                        size={30}
                        style={{ margin: '4%', marginBottom: '30%', height: 30, width: 30 }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </MapView>
            </View>
            <View style={{ flex: 2, elevation: 2, backgroundColor: 'white' }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
            <Button
                title={'Confirm'}
                style={{ width: '70%', marginTop: '2%', marginBottom: '3%' }}
                textStyle={styles.buttontext}

            />
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
        fontSize: 22,
        color: '#38647d',
        fontWeight: 'bold'
    },
    droptime: {
        fontSize: 18,
        color: '#38647d',
    },
    buttontext: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',

        justifyContent: 'center',
    },
    itemstyle:{
        flexDirection: 'row', justifyContent: 'space-between' 
    },
    itemstyle1:{
        flexDirection: 'row', justifyContent: 'space-between' ,backgroundColor:Colors.selecteditmeback
    }
});
