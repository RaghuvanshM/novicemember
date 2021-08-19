
import { driverList } from '../utils/Apis/getdriverlist';
import { DriverList, } from '../actions';
import { call, put } from 'redux-saga/effects';
import { APIUrl, ENV, ENV_TYPE } from '../utils/api-constants';
import { SagaIterator } from 'redux-saga';

import Toast from 'react-native-toast-message';

export const getDriverList = function* (action) {

  try {
    const userDetails = yield call(driverList, { ...action.payload });
  
    if (userDetails.data.response.status === 'true') {
      var makerdata = []
      userDetails.data.data.map((a) => {
        let innerdata = {
          latitude:parseFloat(a.current_lat),
          longitude:parseFloat(a.current_long)
        }
        makerdata.push(innerdata)
      })
    
      yield put(DriverList(makerdata));

    } else {
      //   yield put(loginFailed());


    }

  } catch (e) {
  
    // yield put(loginFailed(e?.response?.data?.message));
    Toast.show({
      type: 'error',
      text1: e?.response?.data?.message || 'Somthing Went Wrong',
      visibilityTime: 3000,
      position: 'bottom',
    });
  }
};
