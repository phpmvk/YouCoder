import axios from 'axios';
import { CodeToExecute } from '../../types/types';
const apiHost = process.env['RAPIDAPI_HOST']
const apiKey = process.env['RAPIDAPI_KEY']

export async function sendCode(codeToExecute: CodeToExecute) {
  const codeSubmissionReq = {
    url: 'https://' + apiHost + '/submissions',
    params: {
      base64_encoded: 'false', //<-- update this when we set up encoding in frontend
      fields: '*'
    },
    method: 'POST',
    headers: {
      'content-type':'application/json',
      'Content-Type':'application/json',
      'X-RapidAPI-Key':apiKey,
      'X-RapidAPI-Host':apiHost,
    },
    data: {
      language_id: codeToExecute.language_id,
      source_code: codeToExecute.source_code,
      stdin: codeToExecute.stdin,
    }
  } 
  //still need to add logic here for status messages

  const codeSubmissionRes = await axios.request(codeSubmissionReq)
  const submissionToken = codeSubmissionRes.data.token;
  
  const submissionResultReq = {
    url: 'https://' + apiHost + '/submissions/' + submissionToken,
    params: {
      base64_encoded: 'false',  //<-- update this when we set up encoding in frontend
      fields: '*' //might be able to remove this entirely
    },
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':apiKey,
      'X-RapidAPI-Host':apiHost,
    }
  }

  const submissionResultRes = await axios.request(submissionResultReq);
  return submissionResultRes.data.stdout
}