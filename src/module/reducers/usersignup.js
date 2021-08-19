import { createReducer } from "redux-act"
import { apiFailed, signupSuccess, signupclick } from "../actions"


const initialState = {
isButtonclick:false,
isSignupsuccess:false,
isSignuPfaild:false
}
 
export const usersignup = createReducer({}, initialState)
usersignup.on(signupSuccess, (state, payload) => {
 
    return {
        ...state,
        isButtonclick:false
    }
})
usersignup.on(apiFailed, (state, payload) => {
 
    return {
        ...state,
        isButtonclick:false
    }
})
usersignup.on(signupclick, (state, payload) => {
 
    return {
        ...state,
        isButtonclick:true
    }
})
