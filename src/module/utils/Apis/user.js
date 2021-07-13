import axios from 'axios';
import {APIUrl} from '../api-constants';

export const signInApi = async () => {
 
  return axios.get(APIUrl.fakeapi);
};
