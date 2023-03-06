import { request } from './generic.services';
import axios from 'axios';
import { User } from '~/types/Users';

const url = 'users';

// export const getUser = () => request({ url, method: 'get' });

// export const getCurrentUser = (id: number) => request({url, method: 'get', data: {id}})

export const registration = async(payload: Partial<User>) => await axios({
    method: 'post',
    url: `http://localhost:5000/auth/registration`,
    data: {
        email: payload.email,
        password: payload.password,
    }
});
