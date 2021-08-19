import { createReducer } from "redux-act";
import { DriverList } from "../actions/NearbyDriver";

const initialState ={
driverArray:[]
}

export const alldriver = createReducer({},initialState)
alldriver.on(DriverList,(state,payload)=>{
    return{
        ...state,
        driverArray:payload
    }

})