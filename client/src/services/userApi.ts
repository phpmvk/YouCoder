import { AxiosResponse, AxiosError } from 'axios';
import { protectedHttp } from './baseUrl';
import { Creator, CreatorUpdate } from '../types/Creator';

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
        reject(error);
      }
    });
  }
  creatorUpdate(
    data: CreatorUpdate
  ): Promise<AxiosResponse<UserLogin>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.patch<UserLogin>(
          `/users/creator/update`,
          data
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
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
        reject(error);
      }
    });
  }
}

export default new UserApiService();
