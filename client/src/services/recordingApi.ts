import { AxiosResponse, AxiosError } from 'axios';
import http from './http-common';

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
      return http.post<string>(`/recording/upload`, data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }
}
