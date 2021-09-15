
export const getIsUserAuth = (state) => state
export const getIsAuth =(state)=>state.user.isAuth
export const getUserProfile = (state) => state.user.profile
export const getPhoneNumber = (state)=>state.user.phonenumber
export const getAddress =(state)=>state.user.currentAddress

export const getIsButtonCLick =(state)=>state.user.isButtonCLick
export const getProfileByEmail =(state)=>state.user.profilebyemail
// export const getJwtToken = (state: IStoreState) =>
//   state.user?.profile?.access_token || '';
// export const getWelcomeInfoShow = (state: IStoreState) =>
//   state.user.showWelcomeInfo;
// export const getErrorValue = (state: IStoreState) => state.user.isError;
// export const getSubmitValue = (state: IStoreState) => state.user.isSubmit;
