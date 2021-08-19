import axios from 'axios';
import {APIUrl,ENV_TYPE} from '../api-constants';
export const latngToAddress = async (latlong)=>{

   return axios.get(`${APIUrl.reversegeocode}${latlong?.lat},${latlong?.long}&key=${ENV_TYPE.apikey}`);
  }