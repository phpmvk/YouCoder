import { AxiosResponse, AxiosError } from 'axios';
import { protectedHttp } from './baseUrl';
import { Recording } from '../types/Creator';

class DiscoverApiService {
  discover(): Promise<AxiosResponse<Recording[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.get<Recording[]>(
          `/recording/discover`
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        reject(error);
      }
    });
  }

  discoverQuery(query: string): Promise<AxiosResponse<Recording[]>> {
    console.log('query', query);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.get<Recording[]>(
          `/recording/search?query=${query}`
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        reject(error);
      }
    });
  }

  discoverByUser(id: string): Promise<AxiosResponse<Recording[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.get<Recording[]>(
          `/recording/search?user=${id}`
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

export default new DiscoverApiService();
