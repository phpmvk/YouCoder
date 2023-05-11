import axios from 'axios';
import { CodeToExecute } from '../../types/types';
const apiHost = process.env['RAPIDAPI_HOST']
const apiKey = process.env['RAPIDAPI_KEY']

export async function sendCode(codeToExecute: CodeToExecute) {
  const codeSubmissionReq = {
    url: 'https://' + apiHost + '/submissions',
    params: {
      base64_encoded: 'true', //<-- update this when we set up encoding in frontend
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
  
  let submissionToken;

  try {
    const { data } = await axios.request(codeSubmissionReq)
    submissionToken = data.token;
  } catch (err) {
    console.error(err)
    return 'External error' + err
  }

  
  const submissionResultReq = {
    url: 'https://' + apiHost + '/submissions/' + submissionToken,
    params: {
      base64_encoded: 'true',  //<-- update this when we set up encoding in frontend
      fields: '*' //might be able to remove this entirely
    },
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':apiKey,
      'X-RapidAPI-Host':apiHost,
    }
  }


  let submissionResultRes;
  try {
    const response = await axios.request(submissionResultReq)
    submissionResultRes = response.data
  } catch (err) {
    console.error(err)
    return 'External error' + err
  }

  if (submissionResultRes.stdout === null) {
    return submissionResultRes.stderr
  } else {
    return submissionResultRes.stdout
  }
}