import { AxiosResponse, AxiosError } from 'axios';
import { rootUser } from '../redux/userSlice';
import { protectedHttp } from './baseUrl';

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

class UserApiService {
  creatorLogin(token: string): Promise<AxiosResponse<typeof rootUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.post<typeof rootUser>(
          `/users/creator/login`,
          { token }
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        reject(error);
      }
    });
  }

  creatorUpdate(
    id: string,
    data: typeof rootUser
  ): Promise<AxiosResponse<typeof rootUser>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.patch<typeof rootUser>(
          `/users/creator/update/${id}`,
          data
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        reject(error);
      }
    });
  }

  creatorDelete(id: string): Promise<AxiosResponse<string>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.delete<string>(
          `/users/creator/delete/${id}`
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        reject(error);
      }
    });
  }
}

export default new UserApiService();
