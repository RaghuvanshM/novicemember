import axios from 'axios';
import { endOfDay } from 'date-fns';
import { APIUrl } from '../api-constants';

export const userbookCab = async (payload) => {
    console.log(payload)

    return axios({
        method: 'POST',
        url: `${APIUrl.usercabbook}`,
        headers: {
            'x-api-key': 'prabhat@cab'
        },
        data: payload
    });
};

