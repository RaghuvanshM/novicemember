import {createReducer} from 'redux-act';
import { dropAddress, dropuLatLong, pickupAddress, pickupLatLong } from '../actions';

const initialState ={
    origin:'',
    destionation:'',
    originAddress:'',
    destionationadd:''
}
export const mapreducer = createReducer({}, initialState);

mapreducer.on(pickupLatLong, (state, payload) => {
  
    return {
      ...state,
      origin:payload
    };
  });


  mapreducer.on(pickupAddress, (state, payload) => {
  
    return {
      ...state,
      originAddress:payload
    };
  });

  mapreducer.on(dropuLatLong, (state, payload) => {
  

    return {
      ...state,
      destionation:payload
    };
  });
  mapreducer.on(dropAddress, (state, payload) => {
    console.log(payload)
    return {
      ...state,
      destionationadd:payload
    };
  });