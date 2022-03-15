import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../module/utils/Colors';
import CutomButton from '../Button/Button';
import Iconlist from '../../module/utils/icon';
import Icon from 'react-native-vector-icons/Entypo';

const CircularTextBoxComponent = props => {
  return (
    <View style={styles.textinputview}>
      <TextInput
        placeholder={props.placeholder}
        style={styles.textinput}
        keyboardType={props.keyboardType}
        onFocus={props.onFocus}
        value={props.value}
        onChangeText={props.onChangeText}
        defaultValue={props.defaultValue}
        autoFocus={props.autoFocus}
      />
      {/* {props.isicon ? (
        <TouchableOpacity style={{justifyContent: 'center'}}
        onPress={props.iconPress}
        >
          {props.icon ? (
            <Icon name={Iconlist.eyecross} size={30} style={{margin: '4%'}} />
          ) : (
            <Icon name={Iconlist.eyeopen} size={30} style={{margin: '4%'}} />
          )}
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
};
export default CircularTextBoxComponent;

const styles = StyleSheet.create({
  textinputview: {
    borderWidth: 2,
    width: '90%',
    backgroundColor: 'white',
    borderColor: '#cdc7b0',
    borderRadius: 30,
    marginBottom: '4%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  textinput: {
    fontSize: 15,
    width: '100%',
  },
});
