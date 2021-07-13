import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
const DrawerContent = (props) => {
    return (
        <TouchableOpacity
        style={{margin:'3%'}}
        
        >
            <Text style={styles.contentext}>{props.title} </Text>
        </TouchableOpacity>
    )
}

export default DrawerContent;
const styles = StyleSheet.create({
    contentext:{
        fontSize:18
    
    }
})