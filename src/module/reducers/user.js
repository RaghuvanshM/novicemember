import {createReducer} from 'redux-act';
import {
  authUser,
  signOutUser,
  sendOtp,
  userCurrntAddress,

  userpickupLocation,
  userdropLocatin,
} from '../actions';

const initialState = {
  isAuth: false,
  profile: '',
  phonenumber: '',
  currentAddress: '',
  pickupaddress: '',
  dropaddress: '',
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
  console.log('signoutuser call');
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
  console.log(payload);
  return {
    ...state,
    currentAddress: payload,
    pickupaddress:payload
  };
});
user.on(userpickupLocation, (state, payload) => {
  console.log(payload);
  return {
    ...state,
    pickupaddress: payload,
  };
});
user.on(userdropLocatin, (state, payload) => {
  console.log(payload);
  return {
    ...state,
    dropaddress: payload,
  };
});
