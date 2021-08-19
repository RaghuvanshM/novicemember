import React, {Component} from 'react';
import {Modal, Pressable, ScrollView, Text, View,PermissionsAndroid} from 'react-native';
import {TextInput, Title, FAB} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faCoffee} from '@fortawesome/free-solid-svg-icons';
Mapmyindia.setRestApiKey('zdjgknl2e9nzcw8q6rrcrhz1sctwokdn');
Mapmyindia.setClientId(
  '33OkryzDZsL03Z-bBPJgzrb4MUJ2XpZbD9NtqVb90bUpjgubu-ZnRgkKvNRQDXVNJXw1wdt7oZZ-I2yMzeMq9nN4_VVedCvEtYf3Q6ThXUagSDZdLFYRZQ==',
);
Mapmyindia.setClientSecret(
  'lrFxI-iSEg8ndsP7uuuRF9qAvS_LLzvkypAfjTIis5DbPmgmCBpScspI7b3W_icHkUqdfx4tVRUG-de5sT8GlrlBrEYpC2nhemjFVYfsHr7mZXh_i3BZMW6gzZXKC7df',
);
class AddReatiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddressMOdalvisiable: false,
      formatted_address: '',
      area: '',
      district: '',
      address: '',
      name: '',
      mobile: '',
      email: '',
      gstnumber: '',
      dlnumber: '',
      isloading:false,
      region:''
    };
  }
  componentDidMount(){
    this.requestLocationPermission()
  }
    async requestLocationPermission() {
      try {
          const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'MyMapApp needs access to your location'
          }
          )
  
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             this._getCurrentLocation()
         
         } else {
     
         }
      } catch (err) {
         console.warn(err)
      }
  }
  _getCurrentLocation = () =>{

    Geolocation.getCurrentPosition(
       (position) => {
     
       this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude, 
       })
    },
    (error) => {
        this.setState({ error: error.message })},
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    );
}
  UNSAFE_componentWillMount() {
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
      },
      (error) => {
  
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  }
  onpressCurrentLocation = () => {
    Geolocation.getCurrentPosition((position) => {
  
      Mapmyindia.rev_geocode(
        {lat: position.coords.latitude, lng: position.coords.longitude},
        (response) => {
         if (response) {

          this.setState({
            address: response.results[0].formatted_address,
          });
         }
         else{
          this.setState({
            isAddressMOdalvisiable: true,
            formatted_address:'No Address found'
  
          });
         }
         
        },
      );
    })
    }
    
  
  OnAddressavePress = () => {
    let {formatted_address} = this.state;
    this.setState({address: formatted_address, isAddressMOdalvisiable: false});
  };
  onAddReatailerclicked = () => {
    this.setState({isloading:true})
    let {name, mobile, email, gstnumber, dlnumber, address} = this.state;
    const url = 'https://taion.in/mobileapp/User/Add_retailer';
    let data = {
      name,
      email,
      mobile,
      address,
      gst_no: gstnumber,
      dl_number: dlnumber,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'vijai@123',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.response.status === 'true') {
          showMessage({
            message: res2.response.message,
            type: 'success',
          });
          this.setState({isloading:false})
        } else {
          showMessage({
            message: res2.response.message,
            type: 'single',
          });
          this.setState({isloading:false})
        }
      });
  };
  render() {
    let {
      isAddressMOdalvisiable,
      formatted_address,
      area,
      district,
      address,
      name,
      email,
      gstnumber,
      dlnumber,
      isloading,
      mobile,
    } = this.state;
    const theme = {
      roundness: 5,
      colors: {
        text: 'black',
        placeholder: '#0b59b8',
        primary: 'green',
        background: 'white',
      },
    };
    const eye = (
      <TextInput.Icon
        name="crosshairs-gps"
        size={25}
        color={'#C22D0D'}
        onPress={() => {
          this.onpressCurrentLocation();
        }}
      />
    );
    return (
      <View style={{marginTop: hp('4%')}}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={25}
              color="#006A67"
              style={{marginLeft: wp('4%')}}
            />
          </Pressable>
          <Title style={{marginLeft: wp('25%')}}>Add Retailer</Title>
        </View>
        <ScrollView>
          <View style={{marginTop: hp('2%')}}>
            <TextInput
              theme={theme}
              style={{width: '90%', marginTop: '2%', alignSelf: 'center'}}
              label="Name"
              mode="outlined"
              value={name}
              onChangeText={(text) => {
                this.setState({name: text});
              }}
            />
            <TextInput
              theme={theme}
              style={{width: '90%', marginTop: '2%', alignSelf: 'center'}}
              label="Mobile"
              mode="outlined"
              keyboardType="number-pad"
              value={mobile}
              onChangeText={(text) => {
                this.setState({mobile: text});
              }}
            />
            <TextInput
              theme={theme}
              style={{width: '90%', marginTop: '2%', alignSelf: 'center'}}
              label="Address"
              mode="outlined"
              right={eye}
              value={address}
              onChangeText={(text) => {
                this.setState({address: text});
              }}
            />
            <TextInput
              theme={theme}
              style={{width: '90%', marginTop: '2%', alignSelf: 'center'}}
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={(text) => {
                this.setState({email: text});
              }}
            />
            <TextInput
              theme={theme}
              style={{width: '90%', marginTop: '2%', alignSelf: 'center'}}
              label="GST Number"
              mode="outlined"
              value={gstnumber}
              onChangeText={(text) => {
                this.setState({gstnumber: text});
              }}
            />
            <TextInput
              theme={theme}
              style={{width: '90%', marginTop: '2%', alignSelf: 'center'}}
              label="DL Number"
              value={dlnumber}
              mode="outlined"
              onChangeText={(text) => {
                this.setState({dlnumber: text});
              }}
            />
            <Modal
              animationType="fade"
              transparent={true}
              onRequestClose={()=>{this.setState({isAddressMOdalvisiable:false})}}
              visible={isAddressMOdalvisiable}
              style={{
                height: hp('30%'),
                width: wp('80%'),
                backgroundColor: 'white',
                borderRadius: hp('3%'),
                backgroundColor:'red'
              }}
              >
                <View
                 >
                  <Title style={{margin: hp('4%'), marginTop: hp('4%')}}>
                    {formatted_address}
                  </Title>
                  <Title style={{margin: hp('4%')}}>{district}</Title>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginTop: hp('4%'),
                    }}>
                    <FAB
                      theme={{colors: {accent: '#006A67'}}}
                      label="SAVE"
                      style={{
                        width: wp('30%'),
                        alignSelf: 'center',
                        margin: wp('4%'),
                      }}
                      //  loading={true}
                      color="white"
                      animated={true}
                      onPress={() => this.OnAddressavePress()}
                    />
                    <FAB
                      theme={{colors: {accent: '#ff5b69'}}}
                      label="CANCEL"
                      style={{width: wp('30%'), alignSelf: 'center'}}
                      //  loading={true}
                      color="white"
                      animated={true}
                      onPress={() => this.setState({isAddressMOdalvisiable:false})}
                    />
                  </View>
                </View>
            </Modal>
            <FAB
              theme={{colors: {accent: '#006A67'}}}
              label="ADD"
              style={{width: wp('90%'), alignSelf: 'center', margin: wp('4%')}}
              loading={isloading}
              color="white"
              animated={true}
              onPress={() => this.onAddReatailerclicked()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default AddReatiler;
