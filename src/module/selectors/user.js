
export const getIsUserAuth = (state) => state
export const getUserProfile = (state) => state
export const getPhoneNumber = (state)=>state.user.phonenumber
export const getAddress =(state)=>state.user.currentAddress
export const getPickUpLocation =(state)=>state.user.pickupaddress
export const getDropUpLocation =(state)=>state.user.dropaddress

// export const getJwtToken = (state: IStoreState) =>
//   state.user?.profile?.access_token || '';
// export const getWelcomeInfoShow = (state: IStoreState) =>
//   state.user.showWelcomeInfo;
// export const getErrorValue = (state: IStoreState) => state.user.isError;
// export const getSubmitValue = (state: IStoreState) => state.user.isSubmit;
