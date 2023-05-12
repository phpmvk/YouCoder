import axios, { AxiosResponse, AxiosError } from 'axios';
import { CodeToExecute } from '../types/Console';
import { protectedHttp } from './baseUrl';

class ConsoleApiService {
  getOutput(data: CodeToExecute): Promise<AxiosResponse> | undefined {
    try {
      return protectedHttp.post<{ stdout: string }>(
        `/code-execution/console`,
        data
      );
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }
}

export default new ConsoleApiService();
