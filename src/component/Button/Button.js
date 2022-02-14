import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Colors from '../../module/utils/Colors';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.upperview}>
        <TouchableOpacity
          style={[styles.btn, this.props.style]}
          onPress={this.props.onPress}>
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
    width: '40%',
  },
  btn: {
    paddingVertical: 8,
    backgroundColor: Colors.buttoncolor,
    borderRadius: 15,
  },
  label: {
    color: Colors.themeColor,
    textAlign: 'center',
    fontSize: 15,
  },
});
