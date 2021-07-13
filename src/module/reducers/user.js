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
} from '../actions';

const initialState = {
  isAuth: false,
  profile: '',
  phonenumber: '',
  currentAddress: '',
  pickupaddress: '',
  dropaddress: '',
  pickuplatlong:0,
  droplatlong:0
};

export const user = createReducer({}, initialState);
user.on(authUser, (state, payload) => {
  return {
    ...state,
    isAuth: true,
    profile: payload,
  };
});
user.on(signOutUser, state => {

  return {
    ...state,
    isAuth: false,
    profile: '',
  };
});
user.on(sendOtp, (state, payload) => {
  return {
    ...state,
    phonenumber: payload,
  };
});
user.on(userCurrntAddress, (state, payload) => {

  return {
    ...state,
    currentAddress: payload,
    pickupaddress:payload
  };
});
user.on(userpickupLocation, (state, payload) => {

  return {
    ...state,
    pickupaddress: payload,
  };
});
user.on(userdropLocatin, (state, payload) => {

  return {
    ...state,
    dropaddress: payload,
  };
});

user.on(userDropLatLong, (state, payload) => {
  
  return {
    ...state,
    droplatlong: payload,
  };
})
user.on(userpickupLatLong, (state, payload) => {
 
  return {
    ...state,
    pickuplatlong: payload,
  };
})