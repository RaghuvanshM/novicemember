import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Colors from '../../module/utils/Colors';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.upperview}>
        <TouchableOpacity
          style={[styles.btn,this.props.style]}
          onPress={this.props.onPress}
        >
           <Text style={[styles.label, this.props.textStyle]}>
            {this.props.title}
           </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  upperview: {
    borderWidth: 2, 
    width: '90%', 
    alignSelf: 'center',
    padding:1,
    borderRadius:30,
    borderColor:Colors.buttoncolor
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: Colors.buttoncolor,
    borderRadius:30
  },
  label: {
    color: Colors.themeColor,
    textAlign:'center',
    fontSize: 15,
  },
})