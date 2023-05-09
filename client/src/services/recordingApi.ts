import axios, { AxiosResponse, AxiosError } from 'axios';
import baseURL from './baseUrl';

const http = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

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

export default new RecordingApiService();
