import { AxiosResponse, AxiosError } from 'axios';
import { rootUser } from '../redux/userSlice';
import { protectedHttp } from './baseUrl';
import { Creator } from '../types/Creator';

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
interface UserLogin {
  user: Creator;
}

class UserApiService {
  creatorLogin(): Promise<AxiosResponse<UserLogin>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.post<UserLogin>(
          `/users/creator/login`
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
    data: typeof rootUser
  ): Promise<AxiosResponse<typeof rootUser>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.patch<typeof rootUser>(
          `/users/creator/update/`,
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

  creatorDelete(): Promise<AxiosResponse<string>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.delete<string>(
          `/users/creator/delete`
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
