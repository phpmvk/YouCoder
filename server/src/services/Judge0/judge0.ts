import axios from 'axios';
import { CodeToExecute } from '../../types/types';
const apiHost = process.env['RAPIDAPI_HOST'];
const apiKey = process.env['RAPIDAPI_KEY'];

export async function sendCode(codeToExecute: CodeToExecute) {
  const codeSubmissionReq = {
    url: 'http://' + apiHost + '/submissions',
    params: {
      base64_encoded: 'true',
      fields: '*',
    },
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost,
    },
    data: {
      language_id: codeToExecute.language_id,
      source_code: codeToExecute.source_code,
      stdin: codeToExecute.stdin,
    },
  };

  let submissionToken;

  try {
    const { data } = await axios.request(codeSubmissionReq);
    submissionToken = data.token;
  } catch (err) {
    console.error(err);
    return 'External error' + err;
  }

  const checkStatus = async (token: string): Promise<any> => {
    const submissionResultReq = {
      url: 'http://' + apiHost + '/submissions/' + token,
      params: {
        base64_encoded: 'true',
        fields: '*',
      },
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    };

    try {
      const response = await axios.request(submissionResultReq);
      const statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        return new Promise((resolve) => {
          setTimeout(() => {
            checkStatus(token).then((result) => {
              resolve(result);
            });
          }, 2000);
        });
      } else {
        if (response.data.stdout === null) {
          return response.data.stderr;
        } else {
          return response.data.stdout;
        }
      }
    } catch (err) {
      console.error(err);
      return 'External error' + err;
    }
  };

  try {
    const submissionResult = await checkStatus(submissionToken);
    return submissionResult;
  } catch (err) {
    console.error(err);
    return 'External error' + err;
  }
}
