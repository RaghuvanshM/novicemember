import { addressTolatLong } from '../utils/Apis/AddressTolatlong';
import { dropuLatLong, userDropLatLong, userpickupLatLong } from '../actions';
import {call, put} from 'redux-saga/effects';

export const pickupAddressTolatlong = function* (action) {
    try {
        const latloong = yield call(addressTolatLong,action.payload);
     
      yield put(userpickupLatLong(latloong.data.results[0].geometry))
     
    }
    catch (error) {
    }
}

export const dropAddressTolatlong = function* (action) {
  try {
      const latloong = yield call(addressTolatLong,action.payload);
   
    yield put((dropuLatLong(latloong.data.results[0].geometry.location)))
   
  }
  catch (error) {

  }
}