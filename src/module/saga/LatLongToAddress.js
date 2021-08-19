import { latngToAddress } from '../utils/Apis/latlongAdress';
import { pickupAddress } from '../actions';
import {call, put} from 'redux-saga/effects';

export const LatLongToAddress = function* (action) {

    try {
        const address = yield call(latngToAddress,action.payload);
       
       if(address.status===200){
         yield put(pickupAddress(address.data.results[0].formatted_address))

       }
    }
    catch (error) {

    }
}

