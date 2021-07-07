import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../module/utils/Colors';
import styles from './style';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={[styles.btn,this.props.style]} onPress={this.props.onPress}>
        <Text style={[styles.label,this.props.textStyle]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
