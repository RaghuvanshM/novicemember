import axios from 'axios';
import {APIUrl,ENV_TYPE} from '../api-constants';
export const addressTolatLong = async (address)=>{
   return axios.get(`${APIUrl.googleBaseUrl}${address}&key=${ENV_TYPE.apikey}`);
  }