import {createAction} from 'redux-act';
export const authUser = createAction()
export const signOutUser = createAction();
export const phoneAuth = createAction();
export const sendOtp = createAction();
export const userCurrntAddress = createAction();
export const userpickupLocation = createAction();
export const userdropLocatin = createAction();
export const userpickupLatLong = createAction()
export const userDropLatLong = createAction()
export const pickupAddToLatLong =createAction()
export const dropAddToLatLong =createAction()
export const loginFailed = createAction()
export const loginSuccess = createAction()
export const loginButtonPress = createAction()
export const removeButtonPress = createAction()

