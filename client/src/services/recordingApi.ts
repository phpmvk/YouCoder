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
        reject(error);
      }
    });
  }

  async getAuthenticatedRecording(id: string): Promise<Recording> {
    const response = await protectedHttp.get<Recording>(`/recording/get/${id}`);
    return response.data;
  }
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
        reject(error);
      }
    });
  }

  patchRecording(
    id: string,
    data: updateRecording
  ): Promise<AxiosResponse<Recording>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.patch<Recording>(
          `/recording/update/${id}`,
          data
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
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
        reject(error);
      }
    });
  }

  getAllUserRecordings(): Promise<AxiosResponse<Recording[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await protectedHttp.get<Recording[]>(
          `/recording/user/get`
        );
        resolve(response);
      } catch (e) {
        const error = e as AxiosError;
        reject(error);
      }
    });
  }
}

export default new RecordingApiService();
