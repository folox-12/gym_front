import axios from 'axios';
import { AXIOS_COLLECTION, HTTP_REQUESTS } from '~/types/apiUrl';

const API_URL = 'http://localhost:5000';

export const request = async({ url, method, data } : AXIOS_COLLECTION) => {
    let result: any;

    if (method === HTTP_REQUESTS.GET) {
        let fullUrl = `${API_URL}/${url}`;
        if (data) {
            fullUrl += `/${data.id}`
        }
        result = await axios.get(fullUrl);
    }
    if (method === HTTP_REQUESTS.POST) {
        result = await axios.post(`${API_URL}/:${url}`);
    }
    return result;
};
