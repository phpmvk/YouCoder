import axios, { AxiosResponse, AxiosError } from 'axios';
import { rootUser } from '../redux/userSlice';

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
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

class UserApiService {
  creatorLogin(
    id: string
  ): Promise<AxiosResponse<typeof rootUser> | string[]> | undefined {
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
