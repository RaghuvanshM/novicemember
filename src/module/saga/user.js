
import {signInApi} from '../utils/Apis/user';
import {apiFailed, authUser, loginFailed, loginSuccess, signupSuccess} from '../actions';
import {call, put} from 'redux-saga/effects';
import {APIUrl, ENV, ENV_TYPE} from '../utils/api-constants';
import {SagaIterator} from 'redux-saga';

import Toast from 'react-native-toast-message';

export const signIn = function*(action){


  try {
    const userDetails = yield call(signInApi,APIUrl.login,{...action.payload});
  
    if(userDetails.data.response.status==='true'){
    yield put(loginSuccess(userDetails.data.data))
    Toast.show({
      type: 'error',
      text1: userDetails?.data.response.message|| 'Login Success',
      visibilityTime: 3000,
      position: 'bottom',
    });
    }else{
      yield put(loginFailed());
      Toast.show({
        type: 'success',
        text1: userDetails?.data.response.message|| 'Login Success',
        visibilityTime: 3000,
        position: 'bottom',
      });

    }
    
  } catch (e) {

    yield put(loginFailed(e?.response?.data?.message));
    Toast.show({
      type: 'error',
      text1: e?.response?.data?.message || 'Somthing Went Wrong',
      visibilityTime: 3000,
      position: 'bottom',
    });
  }
};
