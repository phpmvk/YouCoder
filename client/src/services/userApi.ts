import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { rootUser } from '../redux/userSlice';
import baseURL from './baseUrl';

/***************************
to use this file:

import userApi from '../services/userApi';
to call each function:

userApi.creatorLogin(id)
.then((response) => {
  console.log(response);
})
.catch((e) => {
  console.log(e);
});

****************************/

const userHttp = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

userHttp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

class UserApiService {
  creatorLogin():
    | Promise<AxiosResponse<typeof rootUser> | string[]>
    | undefined {
    try {
      return userHttp.post<typeof rootUser>(`/users/creator/add`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }

  creatorUpdate(
    id: string,
    data: typeof rootUser
  ): Promise<AxiosResponse<typeof rootUser>> | undefined {
    try {
      return userHttp.patch<typeof rootUser>(
        `/users/creator/update/${id}`,
        data
      );
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }

  creatorDelete(id: string): Promise<AxiosResponse<string>> | undefined {
    try {
      return userHttp.delete(`/users/creator/delete/${id}`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }
}

export default new UserApiService();
