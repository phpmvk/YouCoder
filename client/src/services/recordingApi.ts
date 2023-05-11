import axios, { AxiosResponse, AxiosError } from 'axios';
import baseURL from './baseUrl';
import { protectedHttp } from './baseUrl';
import { Recording, updateRecording } from '../types/Creator';
import { EditorRecording } from '../types/Editor';

class RecordingApiService {
  getRecording(id: string): Promise<AxiosResponse<Recording>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.get<Recording>(
          `/recording/get/${id}`
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        // console.log(error);
        reject(error);
      }
    });
  }

  async getAuthenticatedRecording(id: string): Promise<Recording> {
    const response = await protectedHttp.get<Recording>(`/recording/get/${id}`);
    return response.data;
  }

  // async getRecording3 (id: string): ({message: AxiosResponse<Recording> | null, error: AxiosError | null }) {
  //   try {
  //     const res = await http.get<Recording>(`/recording/get/${id}`);
  //     return {message: res.data, error: null}
  //   } catch (error) {
  //     return { response: null, error };
  //   }
  // }

  postRecording(
    data: EditorRecording
    // data: RecorderActions
  ): Promise<AxiosResponse<Recording[]>> | undefined {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.post<Recording[]>(
          `/recording/upload`,
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

  deleteRecording(id: string): Promise<AxiosResponse<Recording[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.delete<Recording[]>(
          `/recording/delete/${id}`
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
