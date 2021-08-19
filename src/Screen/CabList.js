import React, { useState } from 'react';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import images from '../assets/images/image';
import Button from '../component/Button/Button';
import Colors from '../module/utils/Colors';
const CabListScreen = (props) => {
    
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
        
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={itemindex == index ? { ...styles.itemstyle } : { ...styles.itemstyle1 }}
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
            
            
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                />
          
            <View style={{marginVertical:'1%'}}>
                <Button
                    title={'Confirm'}
                    textStyle={styles.buttontext}
                    onPress={()=>{props.onPress()}}
                />
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
        color:Colors.sidbardbackgroundcolor,
        fontWeight: 'bold'
    },
    droptime: {
        color:Colors.screentextColor
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
    }
});
