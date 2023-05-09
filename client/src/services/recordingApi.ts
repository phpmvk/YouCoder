import axios, { AxiosResponse, AxiosError } from 'axios';
import baseURL from './baseUrl';
import { protectedHttp, http } from './baseUrl';

class RecordingApiService {
  getRecording(id: string): Promise<AxiosResponse<string>> | undefined {
    try {
      return http.get<string>(`/recording/get/${id}`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }

  postRecording(
    data: string[]
    // data: RecorderActions
  ): Promise<AxiosResponse<string>> | undefined {
    try {
      return protectedHttp.post<string>(`/recording/upload`, data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }
}

export default new RecordingApiService();
