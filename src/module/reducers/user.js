import {createReducer} from 'redux-act';
import {
  authUser,
  signOutUser,
  sendOtp,
  userCurrntAddress,
  
  userpickupLocation,
  userdropLocatin,
  userDropLatLong,
  userpickupLatLong,
  loginFailed,
  loginSuccess,
  loginButtonPress,
  removeButtonPress,
} from '../actions';

const initialState = {
  isAuth: false,
  profile: '',
  phonenumber: '',
  currentAddress: '',
  pickupaddress: '',
  dropaddress: '',
  pickuplatlong:0,
  droplatlong:0,
  isButtonCLick:false
};

export const user = createReducer({}, initialState);
user.on(loginSuccess, (state, payload) => {

  return {
    ...state,
    isAuth: true,
    profile: payload,
    isButtonCLick:false
  };
});
user.on(signOutUser, state => {

  return {
    ...state,
    isAuth: false,
    profile: '',
  };
});

user.on(loginFailed,(state,payload)=>{
  return {
    ...state,
    isAuth:false,
    isButtonCLick:false
  }
})
user.on(loginButtonPress,(state)=>{
  return {
    ...state,
    isButtonCLick:true
  }
})
user.on(sendOtp, (state, payload) => {
  return {
    ...state,
    phonenumber: payload,
  };
});
user.on(removeButtonPress, (state, payload) => {
  return {
    ...state,
    isButtonCLick:false
  };
});
