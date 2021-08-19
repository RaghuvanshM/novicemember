import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Location from 'react-native-vector-icons/EvilIcons';
import { useDispatch } from 'react-redux';
import { dropAddress, dropAddToLatLong } from '../module/actions';
import Colors from '../module/utils/Colors';

const SearchResultComponent = ({item,singleItemPress}) => {

  const dispatch = useDispatch()
 const onResultPress =(item)=>{

   dispatch(dropAddress(item.item.description))
   dispatch(dropAddToLatLong(item.item.description))
   singleItemPress()
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
          {item.item.structured_formatting.main_text}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeaddress}>
        {item.item.structured_formatting.secondary_text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default SearchResultComponent;

const styles = StyleSheet.create({
  resultview: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    marginVertical:'2%',
   padding:5
  },
  locationview: {
    height: 30,
    width: 30,
    backgroundColor: '#a8a8a8',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal:10,
    alignItems: 'center',
  },
  resulttext: {
  
    color:Colors.sidbardbackgroundcolor,
   
  
  },
  placeaddress:{
    color:Colors.screentextColor,
   

    
  }
});
