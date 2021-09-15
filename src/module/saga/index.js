import { takeLatest } from 'redux-saga/effects';
import * as user from './user';
import * as AddTolatlong from './AddressTolatlong'
import * as Addressltlng from './LatLongToAddress'
import * as userSignUp from './usersignup'
import * as actions from '../actions';
import * as drivers from './getDriver';
import * as cabBooking from './userCabBook'
export default function* rootSaga() {

  // yield takeLatest(actions.getAirQualityIndex, airQuality.getAirQuality);

  yield takeLatest(actions.pickupAddToLatLong, AddTolatlong.pickupAddressTolatlong);
  yield takeLatest(actions.dropAddToLatLong, AddTolatlong.dropAddressTolatlong);
  yield takeLatest(actions.convertLatlng, Addressltlng.LatLongToAddress);
  yield takeLatest(actions.memberSignUp, userSignUp.signUp);
  yield takeLatest(actions.authUser, user.signIn);
  yield takeLatest(actions.getAllDriver, drivers.getDriverList);
  yield takeLatest(actions.BookCab, cabBooking.userBooking);





  // yield takeLatest(actions.getZoneDetails, zones.getZoneDetails);
  // yield takeLatest(actions.changeZoneNameAction, zones.setZoneName);
  // yield takeLatest(actions.changeTintAction, zones.changeTintValue);
}
