import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Location from 'react-native-vector-icons/EvilIcons';
import Colors from '../module/utils/Colors';

const SearchResultComponent = ({item,textPress}) => {
 const onResultPress =(item)=>{
  textPress()
 }
  return (
    <TouchableOpacity 
    style={styles.resultview}
    onPress ={()=>{onResultPress(item)}}
    >
      <View style={styles.locationview}>
        <Location
          name="location"
          size={30}
          color="white"
          style={{alignSelf: 'center'}}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.resulttext}>
          {item.item.placeName}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeaddress}>
          {item.item.placeAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default SearchResultComponent;

const styles = StyleSheet.create({
  resultview: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#d4d4d4',
    marginVertical:'2%',
    padding:'2%'
  },
  locationview: {
    height: 40,
    width: 40,
    backgroundColor: '#a8a8a8',
    borderRadius: 20,
    justifyContent: 'center',
    margin: '2%',
    alignItems: 'center',
  },
  resulttext: {
    fontSize: 16,
    color:Colors.sidbardbackgroundcolor,
    width: '95%',
  },
  placeaddress:{
    color:Colors.screentextColor,
    
  }
});
