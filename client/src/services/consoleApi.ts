import { AxiosResponse, AxiosError } from 'axios';
import http from './http-common';
import { CodeToExecute } from '../types/console';

class ConsoleApiService {
  getOutput(data: CodeToExecute): Promise<AxiosResponse<string[]>> | undefined {
    try {
      return http.post<string[]>(`/users/console`, data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }
}
