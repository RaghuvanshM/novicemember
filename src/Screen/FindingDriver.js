import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import messaging from '@react-native-firebase/messaging';
const FindingDriver = () => {
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage)
            navigation.navigate('driverdetail',{...remoteMessage.data})
        });

        return unsubscribe;
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.textstyle}> Connecting to the Driver</Text>
            </View>
            <View style={{ flex: 1 }}>
                <ActivityIndicator
                    size={'large'}
                    color='red'

                />
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('home') }}
                >
                    <Text style={styles.textstyle}>Cancel Ride</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default FindingDriver;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30

    },
    textstyle: {
        fontSize: 17,
        marginTop: 20,
        fontFamily: 'OpenSans-Bold',
        alignSelf: 'center'
    }
})