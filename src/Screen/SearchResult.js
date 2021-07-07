import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ArrowLeft from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import SearchResultComponent from '../component/SearchResultComponent';
import { getUserProfile, getAddress } from '../../src/module/selectors';
import { useSelector } from 'react-redux';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { useDispatch } from 'react-redux';
import { userpickupLocation, userdropLocatin } from '../module/actions';

const SearchResult = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentAddress = useSelector(getAddress);
  const [searchResult, setSearchResult] = useState([]);
  const [pickupaddress, setPickupAddress] = useState([]);
  const [dropaddress, setDropAddress] = useState();
  const pickupLocation = text => {
    console.log(text === '');
    if (text !== '') {
      Mapmyindia.atlas_auto({ query: text }, response => {
        console.log(response);
        setSearchResult(response.suggestedLocations);
      });
    } else {
      setSearchResult('');
    }
  };
  const dropLocation = text => {
    console.log(text === '');
    if (text !== '') {
      Mapmyindia.atlas_auto({ query: text }, response => {
        console.log(response);
        setSearchResult(response.suggestedLocations);
      });
    } else {
      setSearchResult('');
    }
  };

  const onTextPress = ({ item }) => {
    if (props.route.params.screen == 'pickupsscreen') {
      dispatch(userpickupLocation(item.placeAddress));
      navigation.goBack();
    } else {
      dispatch(userdropLocatin(item.placeAddress));
      navigation.goBack();
    }

    setSearchResult('');
  };
  const onNextButtonPress = () => {
    navigation.navigate('cablistscreen');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={styles.headerText}>
        <View style={{ flexDirection: 'row', flex: 1, marginBottom: '3%' }}>
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: 'center' }}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft name="arrow-left" size={30} />
          </TouchableOpacity>
          <View style={{ flex: 0.9, backgroundColor: '#d4d6d9' }}>
            {props.route.params.screen == 'pickupsscreen' ? (
              <TextInput
                placeholder="Pick Up Location"
                style={styles.textinput}
                placeholderTextColor="#38647d"
                defaultValue={currentAddress}
                onChangeText={text => pickupLocation(text)}
              />
            ) : (
              <TextInput
                placeholder="Drop Location"
                style={styles.textinput}
                placeholderTextColor="#38647d"
                onChangeText={text => pickupLocation(text)}
              />
            )}
          </View>
        </View>
  
      </KeyboardAwareScrollView>
      <View style={{ flex: 3 }}>
        <FlatList
          data={searchResult}
          renderItem={item => (
            <SearchResultComponent
              item={item}
              textPress={() => {
                onTextPress(item);
              }}
            />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>

      
    </SafeAreaView>
  );
};
export default SearchResult;
const styles = StyleSheet.create({
  headerText: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 5,
    width: '100%',
  },
  texinputview: {
    flex: 0.9,
    backgroundColor: '#d4d6d9',

    alignSelf: 'center',
    marginBottom: '2%',
  },

  arrow: {
    flexDirection: 'row',
  },
  textinput: {
    fontSize: 20,
    flex: 1,
    color: '#38647d',
    fontWeight: 'bold',
  },
 
});
