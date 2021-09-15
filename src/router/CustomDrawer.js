import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../component/Colors'
import FontAwesomeicon from 'react-native-vector-icons/Ionicons';
import iconlist from '../component/icon';
import DrawerContentText from '../component/Label/DrawerContentLable';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserAuth, getProfileByEmail, getUserProfile } from '../module/selectors';
import { signOutUser } from '../module/actions';

const CustomeContent = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const profile = useSelector(getIsUserAuth)
    const getEmailProfile = useSelector(getProfileByEmail)
    console.log(getEmailProfile)
    const onSignOutPress = () => {

        dispatch(signOutUser())
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 0.3, backgroundColor: Colors.sidbardbackgroundcolor }}

            >
                <View style={styles.nameview}>


                    {/* {profile&&<View style={styles.imageview}>
                        {profile.user.isAuth && <Image
                            source={{ uri: profile?.user?.profile?.photo }}
                            resizeMode='contain'
                            style={{ height: 60, width: 60, borderRadius: 30 }}
                        /> }
                    </View>}
                    <View style={{ justifyContent: 'center', marginLeft: '6%' }}>
                        {profile.user.isAuth ? <Text
                            numberOfLines={1}
                            style={styles.personname}>{profile?.user?.profile?.name}</Text> : null
                        }
                    </View> */}
                    {getEmailProfile != '' &&
                        <View>

                            <Text
                                numberOfLines={1}
                                style={styles.personname}>{getEmailProfile?.name}</Text>
                                   <Text
                                numberOfLines={1}
                                style={styles.personname}>{getEmailProfile?.email}</Text>
                        </View>
                    }

                </View>
                <View style={styles.bottomline} />

            </View>
            <DrawerContentText
                title={'Feedback'}

            />
            <DrawerContentText
                title={'Contact Us'}

            />
            <DrawerContentText
                title={'Help'}

            />
            <DrawerContentText
                title={'Support'}

            />
            <DrawerContentText
                title={'Last booking'}

            />
            <DrawerContentText
                title={'Log Out'}
                onPress={() => { onSignOutPress() }}
            />
        </SafeAreaView>
    )
}
export default CustomeContent;

const styles = StyleSheet.create({
    imageview: {
        height: 60,
        width: 60,
        backgroundColor: Colors.imageviewcolor,
        borderRadius: 40,
        justifyContent: 'center',
    },
    personname: {
        fontSize: 17,
        color: Colors.drawertext,
        fontWeight: 'bold',
        width: '80%'
    },
    nameview:
    {
        flexDirection: 'row',
        marginTop: '10%', marginLeft: '3%',

    },
    bottomline: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.stripline,
        flex: 0.1
    }

})