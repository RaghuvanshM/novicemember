import React, { useRef,useEffect } from 'react';
import {Text,View,Animated,StyleSheet} from 'react-native';

const ConfirmationBook =()=>{
    const barWidth = useRef(new Animated.Value(0)).current;
    const progressPercent = barWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", `100%`],
    })
    useEffect(() => {
      
    
        Animated.timing(barWidth, {
            duration: 5000,
            toValue: 100,
            useNativeDriver: false
        }).start();
    }, [])
    return(
        <View >
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: 'red',
              width: progressPercent,
            }
         ]}
        />
      </View>
    )
}
export default ConfirmationBook;
const styles = StyleSheet.create({

})