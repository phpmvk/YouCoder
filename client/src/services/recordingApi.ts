import axios, { AxiosResponse, AxiosError } from 'axios';
import baseURL from './baseUrl';
import { protectedHttp, http } from './baseUrl';
import { Recording, updateRecording } from '../types/Creator';

class RecordingApiService {
  getRecording(id: string): Promise<AxiosResponse<Recording>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await http.get<Recording>(`/recording/get/${id}`);
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        reject(error);
      }
    });
  }

  postRecording(
    data: string[]
    // data: RecorderActions
  ): Promise<AxiosResponse<Recording[]>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.post<Recording[]>(
          `/recording/create`,
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

  patchRecording(
    id: string,
    data: updateRecording
  ): Promise<AxiosResponse<Recording[]>> {
    console.log('id', id);
    console.log('data', data);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.patch<Recording[]>(
          `/recording/update/${id}`,
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
}

export default new RecordingApiService();
