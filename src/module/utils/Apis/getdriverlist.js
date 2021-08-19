import axios from 'axios';
import { endOfDay } from 'date-fns';
import {APIUrl} from '../api-constants';

export const driverList = async (payload) => {
  
  return axios({
    method: 'POST',
    url:`${APIUrl.getDriver}`,
    headers:{
      'x-api-key':'prabhat@cab'
    },
    data:payload
  });
};

