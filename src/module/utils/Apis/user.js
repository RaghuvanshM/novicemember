import axios from 'axios';
import {APIUrl} from '../api-constants';

export const signInApi = async () => {
  console.log('cla')
  return axios.get(APIUrl.fakeapi);
};
