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
          `/users/creator/add`,
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
    try {
      return protectedHttp.patch<typeof rootUser>(
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
      return protectedHttp.delete(`/users/creator/delete/${id}`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }
}

export default new UserApiService();
