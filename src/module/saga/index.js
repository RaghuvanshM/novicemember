import {takeLatest} from 'redux-saga/effects';
import * as user from './user';
import * as actions from '../actions';

export default function* rootSaga() {

  // yield takeLatest(actions.getAirQualityIndex, airQuality.getAirQuality);
  yield takeLatest(actions.phoneAuth, user.signIn);
  // yield takeLatest(actions.getZoneDetails, zones.getZoneDetails);
  // yield takeLatest(actions.changeZoneNameAction, zones.setZoneName);
  // yield takeLatest(actions.changeTintAction, zones.changeTintValue);
}
