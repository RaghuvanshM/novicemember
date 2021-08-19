import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import Colors from '../module/utils/Colors'
import RBSheet from "react-native-raw-bottom-sheet";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getDropupAddress, getPickupAddress } from '../module/selectors';
import { dropAddress, dropuLatLong, pickupAddress, pickupLatLong } from '../module/actions';
import Button from '../component/Button/Button';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('screen')
import Icon from 'react-native-vector-icons/AntDesign';
import Iconlist from '../module/utils/icon';
import CrossIcon from 'react-native-vector-icons/Entypo'
const SearchResult = () => {

  const pickupAdress = useSelector(getPickupAddress)
  const dropupadd = useSelector(getDropupAddress)
  const dispatch = useDispatch()
  const navigation = useNavigation()
 
  const refRBSheet1 = useRef()
  const refRBSheet2 = useRef()
  const pickupLocationPress = () => {
    refRBSheet1.current.open()
  }
  const dropLocationPress = () => {
    refRBSheet2.current.open()
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
      <TouchableOpacity
          onPress={()=>{  navigation.goBack()}}
          style={{margin:20}}
          >
          <Icon
          name={Iconlist.arrowleft}
          size={30}
         
        />
          </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <View style={styles.searchview}

          >
            <TextInput
              placeholder={'Pick Up Location '}
              placeholderTextColor={'red'}

              defaultValue={pickupAdress}
              onFocus={() => { pickupLocationPress() }}
            />
          </View>
          <View style={styles.searchview}

          >
            <TextInput
              placeholder={'Drop Location  '}

              value={dropupadd}
              onFocus={() => { dropLocationPress() }}

            />
          </View>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet1}
        height={height}
        openDuration={400}

      >
        <View
          style={{ flexDirection:'row',justifyContent:'space-between',margin:'3%' }}
        >
          <TouchableOpacity
          onPress={()=>{  refRBSheet1.current.close()}}
          >
          <Icon
          name={Iconlist.arrowleft}
          size={30}
          style={{ margin: '4%' }}
        />
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=>{  refRBSheet1.current.close()}}
          >
          <CrossIcon
          name={'cross'}
          size={30}
         
        />
          </TouchableOpacity>
        </View>
        <GooglePlacesAutocomplete
          placeholder='Search'
          styles={textinputstyle}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            dispatch(pickupLatLong(details.geometry.location));
            dispatch(pickupAddress(details.formatted_address))
            refRBSheet1.current.close()
          }}
          debounce={400}
          query={{
            key: 'AIzaSyA-pOvrefHwsBnK1CLVEGyjOrNcrU-oPAA',
            language: 'en',
          }}

        />

      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        height={height}
        openDuration={250}

      >
          <View
          style={{ flexDirection:'row',justifyContent:'space-between',margin:'3%' }}
        >
          <TouchableOpacity
          onPress={()=>{  refRBSheet2.current.close()}}
          >
          <Icon
          name={Iconlist.arrowleft}
          size={30}
          style={{ margin: '4%' }}
        />
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=>{  refRBSheet2.current.close()}}
          >
          <CrossIcon
          name={'cross'}
          size={30}
         
        />
          </TouchableOpacity>
        </View>
        <GooglePlacesAutocomplete
          placeholder='Search'
          styles={textinputstyle}
          fetchDetails={true}
          debounce={400}
          query={{
            key: 'AIzaSyA-pOvrefHwsBnK1CLVEGyjOrNcrU-oPAA',
            language: 'en',
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            dispatch(dropuLatLong(details.geometry.location));
            dispatch(dropAddress(details.formatted_address))
            refRBSheet2.current.close()
          }}

        />
      </RBSheet>
      {pickupAdress && dropupadd ? <View style={{ marginTop: height / 1.2, position: 'absolute', width: width * 0.9 }}>
        <Button
          title={'Next'}
          textStyle={{ fontSize: 18, color: 'white' }}
          onPress={() => { navigation.navigate('bookcab') }}

        />
      </View> : null}
    </View>
  )
}
export default SearchResult;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerview: {

    backgroundColor: 'white',
    elevation: 5,
    flex: 0.3
  },
  searchview: {
    width: width * 0.9,
    backgroundColor: '#e0e0e0',
    margin: '2%',
    padding: 5

  },
  textstyle: {
    fontSize: 18,
    color: 'black'
  }
})

const textinputstyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: '6%',
    width: width * 0.9,
    alignSelf: 'center'

  },
  textInput: {
    backgroundColor: '#e0e0e0',
    fontSize: 22,


  },
  texinputContainer: {

    paddingBottom: 0
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',

    justifyContent: 'center',
  },
})