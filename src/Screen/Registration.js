import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
    Button,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box'
import { api } from '../component/Constant/api';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showMessage, hideMessage } from "react-native-flash-message";
import Geolocation from '@react-native-community/geolocation';
Mapmyindia.setRestApiKey('zdjgknl2e9nzcw8q6rrcrhz1sctwokdn');
Mapmyindia.setClientId(
    '33OkryzDZsL03Z-bBPJgzrb4MUJ2XpZbD9NtqVb90bUpjgubu-ZnRgkKvNRQDXVNJXw1wdt7oZZ-I2yMzeMq9nN4_VVedCvEtYf3Q6ThXUagSDZdLFYRZQ==',
);
Mapmyindia.setClientSecret(
    'lrFxI-iSEg8ndsP7uuuRF9qAvS_LLzvkypAfjTIis5DbPmgmCBpScspI7b3W_icHkUqdfx4tVRUG-de5sT8GlrlBrEYpC2nhemjFVYfsHr7mZXh_i3BZMW6gzZXKC7df',
);
import { format } from "date-fns";
class CabDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isload: false,
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            createpassword: '',
            dateofbirth: '',
            pickuplocation: '',
            droplocation: '',
            fromdate: '',
            noofchild: '',
            showcpassword:false,
            childrensname: '',
            childrensage: '',
            isDatePickerVisible: false,
            isFromDatePicker: false,
            isChecked: false,
            address: ''

        }
    }
    componentDidMount() {
        this.setState({
            isload: true
        })
    }
    isCheckedbox = () => {
     
        showMessage({
            message: "Please Accept Term ana conditon",
            type: "danger",
        });
    }
    OnSubmitClicked = async () => {
        let { firstname, lastname, email, phone, createpassword, dateofbirth, address, droplocation, fromdate, noofchild, childrensage, childrensname } = this.state;

        const url = `${api}/memberSingup`
        let data = {
            first_name: firstname,
            last_name: lastname,
            email,
            mobile: phone,
            password: createpassword,
            dob: dateofbirth,
            pickup_location: address,
            drop_location: droplocation,
            from_date: fromdate,
            no_of_child: noofchild,
            children_name: childrensname,
            children_age: childrensage,
        }
        console.log(data)
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'prabhat@cab'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res2 => {
                console.log(res2)
                if (res2.response.status === 'true') {
                    showMessage({
                        message: res2.response.message,
                        type: "success",
                    });
                    AsyncStorage.setItem('Driverid', res2.data.uid.toString())
                }
                else {
                    showMessage({
                        message: res2.response.message,
                        type: "single line",
                    });


                }
            })

    }
    onpressCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.029,
                    longitudeDelta: 0.029
                };
                this.setState({
                    region: region,
                });
                Mapmyindia.rev_geocode(
                    { lat: position.coords.latitude, lng: position.coords.longitude },
                    (response) => {
                        if (response) {
                            this.setState({
                                address: response.results[0].formatted_address,
                            });
                        }
                        else {
                            this.setState({
                                isAddressMOdalvisiable: true,
                                formatted_address: 'No Address found'

                            });
                        }

                    },
                )
            },
            (error) => {

            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        )
    }
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    };

    handleConfirm = (date) => {
        var formattedDate = format(date, "dd-MM-yyyy ");
        this.setState({
            dateofbirth: formattedDate
        })
        this.hideDatePicker();
    };
    showFromDatePicker = () => {
        this.setState({ isFromDatePicker: true })
    };

    hideFromDatePicker = () => {
        this.setState({ isFromDatePicker: false })
    };

    handleConfirmFromDatePicker = (date) => {
        var formattedDate = format(date, "dd-MM-yyyy ");
        this.setState({
            fromdate: formattedDate
        })
        this.hideFromDatePicker();
    };
    render() {
        let { isload, isChecked, isDatePickerVisible, showcpassword, dateofbirth, isFromDatePicker, address, fromdate } = this.state

        const locationicon = (
            <TextInput.Icon
                name="crosshairs-gps"
                size={25}
                color={'#C22D0D'}
                onPress={() => {
                    this.onpressCurrentLocation();
                }}
            />
        )
        const eye = (
            <TextInput.Icon
              name="eye"
              size={25}
              color={'#C22D0D'}
              onPress={() => {
                this.setState({showcpassword: !showcpassword});
              }}
            />
          );
          const eyecross = (
            <TextInput.Icon
              name="eye-off"
              size={25}
              color={'#C22D0D'}
              onPress={() => {
                this.setState({showcpassword: !showcpassword});
              }}
            />
          );
        if (isload) {
            return (
                <View>
                    <ScrollView style={{ marginBottom: hp('4%') }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <View style={{ padding: 10 }}>
                                <Icon name="arrowleft" size={30} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, alignSelf: 'center', color: '#343a40' }}>Become A Member </Text>
                        <View style={styles.singletextinput}>
                            <TextInput
                                label="First Name"
                                onChangeText={(text) => { this.setState({ firstname: text }) }}

                            />
                        </View>
                        <View style={styles.singletextinput}>
                            <TextInput
                                label="Email"
                                onChangeText={(text) => { this.setState({ email: text }) }}

                            />
                        </View>

                        <View style={styles.singletextinput}>
                            <TextInput
                                label="Last Name"
                                onChangeText={(text) => { this.setState({ lastname: text }) }}

                            />
                        </View>
                        <View style={styles.singletextinput}>
                            <TextInput
                                label="Create Password"
                                onChangeText={(text) => { this.setState({ createpassword: text }) }}
                                secureTextEntry={showcpassword}
                              
                                right={showcpassword ? eyecross : eye}

                            />
                        </View>
                        <View style={styles.singletextinput}>
                            <TextInput
                                label="Phone"
                                onChangeText={(text) => { this.setState({ phone: text }) }}
                                keyboardType='number-pad'
                                maxLength={10}

                            />
                        </View>
                        <View style={styles.singletextinput}>
                            <TextInput
                                label="Date of birth"
                                onChangeText={(text) => { this.setState({ address: text }) }}
                                onFocus={this.showDatePicker}
                                value={dateofbirth}

                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                            />
                            <View style={styles.singletextinput}>
                                <TextInput
                                    label="Pickup Location"
                                    onChangeText={(text) => { this.setState({ pickuplocation: text }) }}
                                    right={locationicon}
                                    value={address}

                                />
                            </View>
                            <View style={styles.singletextinput}>
                                <TextInput
                                    label="Drop Location"
                                    onChangeText={(text) => { this.setState({ droplocation: text }) }}

                                />
                            </View>
                            <View style={styles.singletextinput}>
                                <TextInput
                                    label="From Date"
                                    onFocus={this.showFromDatePicker}
                                    value={fromdate}

                                />
                                <DateTimePickerModal
                                    isVisible={isFromDatePicker}
                                    mode="date"
                                    onConfirm={this.handleConfirmFromDatePicker}
                                    onCancel={this.hideFromDatePicker}
                                />
                            </View>
                            <View style={styles.singletextinput}>
                                <TextInput
                                    label="No of child"
                                    onChangeText={(text) => { this.setState({ noofchild: text }) }}
                                    keyboardType='number-pad'

                                />
                            </View>
                            <View style={styles.singletextinput}>
                                <TextInput
                                    label="Children's Name"
                                    onChangeText={(text) => { this.setState({ childrensname: text }) }}

                                />
                            </View>
                            <View style={styles.singletextinput}>
                                <TextInput
                                    label="Children's Age"
                                    onChangeText={(text) => { this.setState({ childrensage: text }) }}
                                    keyboardType='number-pad'

                                />
                            </View>
                        </View>
                        <View style={styles.privacypolicy}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked
                                    })
                                }}
                                isChecked={this.state.isChecked}

                            />
                            <View style={{marginHorizontal:'5%'}}>
                            <Text style={{ fontSize: 20, marginLeft: wp('3%') }}
                            >
                                Please accept our <Text style={{ color: 'blue' }}
                                    onPress={() => Linking.openURL('https://novice.jingleinfo.com/privacypolicy.php')}
                                >privacy policy</Text> and <Text style={{ color: 'blue' }}
                                    onPress={() => Linking.openURL('https://novice.jingleinfo.com/term-condition.php')}
                                >term & conditions</Text>
                            </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => { isChecked ? this.OnSubmitClicked() : this.isCheckedbox() }}
                        >
                            <LinearGradient colors={['#e83e8c', '#e83e8c', '#e83e8c']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Submit Now
                     </Text>
                            </LinearGradient>
                        </TouchableOpacity>



                        {/* <WebView
                            originWhitelist={['*']}
                            source={{ uri: 'https://instamobile.io/blog' }}
                            renderLoading={this.LoadingIndicatorView}
                            startInLoadingState={true}
                        /> */}
                    </ScrollView>
                </View>
            )
        }
        else {
            return (
                <ActivityIndicator size='large' color='red' style={{ flex: 1, alignSelf: 'center' }} />
            )
        }
    }
}
export default CabDetails;

const styles = StyleSheet.create({
    cardview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '3%',
        marginTop: hp('3%')
    },
    singletextinput: {
        width: wp('95%'),
        alignSelf: 'center',

        marginTop: hp('3%')
    },
    linearGradient: {
        padding: 10,
        width: wp('90%'),
        marginTop: hp('5%'),
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    privacypolicy: {
        flexDirection: 'row',
        marginHorizontal: wp('2%'),
        marginTop: hp('2%')
    }
})