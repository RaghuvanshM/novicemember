
import {apiFailed, authUser, loginFailed, loginSuccess, signupSuccess} from '../actions';
import {call, put} from 'redux-saga/effects';
import {APIUrl, ENV, ENV_TYPE} from '../utils/api-constants';
import {userbookCab} from '../utils/Apis/bookcab'
import Toast from 'react-native-toast-message';

export const userBooking = function*(action){

console.log(action)
  try {
    const userDetails = yield call(userbookCab,{...action.payload});
    console.log(userDetails)
    // if(userDetails.data.respontionse.status==='true'){
    // yield put(loginSuccess(userDetails.data.data))
    // Toast.show({
    //   type: 'error',
    //   text1: userDetails?.data.response.message|| 'Login Success',
    //   visibilityTime: 3000,
    //   position: 'bottom',
    // });
    // }else{
    //   yield put(loginFailed());
    //   Toast.show({
    //     type: 'success',
    //     text1: userDetails?.data.response.message|| 'Login Success',
    //     visibilityTime: 3000,
    //     position: 'bottom',
    //   });

    // }
    
  } catch (e) {
      console.log(e)
    // yield put(loginFailed(e?.response?.data?.message));
    // Toast.show({
    //   type: 'error',
    //   text1: e?.response?.data?.message || 'Somthing Went Wrong',
    //   visibilityTime: 3000,
    //   position: 'bottom',
    // });
  }
};
