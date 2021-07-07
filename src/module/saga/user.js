
import {signInApi} from '../utils/Apis/user';
import {authUser} from '../actions';
import {call, put} from 'redux-saga/effects';
import {ENV, ENV_TYPE} from '../utils/api-constants';
import {SagaIterator} from 'redux-saga';

// import Toast from 'react-native-toast-message';

export const signIn = function*(){
 
  try {
    const userDetails = yield call(signInApi);
    console.log(userDetails);
    // yield put(authUser(userDetails.data.data));
  } catch (e) {
    console.log(e)
    // yield put(authFailed(e?.response?.data?.message));
    // Toast.show({
    //   type: 'error',
    //   text1: e?.response?.data?.message || 'Incorrect email or password!',
    //   visibilityTime: 30000,
    //   position: 'bottom',
    // });
  }
};
