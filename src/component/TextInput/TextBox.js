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

const TextBoxComponent = props => {
  return (
    <View style={styles.textinputview}>
      <TextInput
        placeholder={props.placeholder}
        style={styles.textinput}
        keyboardType={props.keyboardType}
        onFocus={props.onFocus}
        value={props.value}
      />
      {props.isicon ? (
        <TouchableOpacity style={{justifyContent: 'center'}}
        onPress={props.iconPress}
        >
          {props.icon ? (
            <Icon name={Iconlist.eyecross} size={30} style={{margin: '4%'}} />
          ) : (
            <Icon name={Iconlist.eyeopen} size={30} style={{margin: '4%'}} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default TextBoxComponent;

const styles = StyleSheet.create({
  textinputview: {
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    borderColor: Colors.textinputbordercolor,
    borderRadius: 10,
    marginBottom: '4%',
    flexDirection: 'row',
  },
  textinput: {
    fontSize: 18,
    width: '89%',
  },
});
