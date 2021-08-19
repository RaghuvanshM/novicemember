import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { height, width } = Dimensions.get('screen')
const SearchDestionation = () => {
  
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>Good Morning Raghuvansh Mani</Text>
            <GooglePlacesAutocomplete
                placeholder='Where to?'
                styles={textinputstyle}
                debounce={400}
                query={{
                    key: 'AIzaSyA-pOvrefHwsBnK1CLVEGyjOrNcrU-oPAA',
                    language: 'en',
                  }}
                  style={{}}
            />
             <GooglePlacesAutocomplete
                placeholder='Where to?'
                styles={textinputstyle}
                debounce={400}
                query={{
                    key: 'AIzaSyA-pOvrefHwsBnK1CLVEGyjOrNcrU-oPAA',
                    language: 'en',
                  }}
            />
        </View>
    )
}
export default SearchDestionation;
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
    }
})