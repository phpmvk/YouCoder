import axios from 'axios';
import { CodeToExecute } from '../../types/types';
const apiHost = process.env['RAPIDAPI_HOST']
const apiKey = process.env['RAPIDAPI_KEY']

export async function sendCode(codeObject: CodeToExecute) {
  
  const submissionPost = {
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
      language_id: codeObject.language_id,
      source_code: codeObject.source_code,
      stdin: codeObject.stdin,
    }
  } 

  const submissionPostResponse = await axios.request(submissionPost)
  const token = submissionPostResponse.data.token;
  
  const submissionGet = {
    url: 'https://' + apiHost + '/submissions/' + token,
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

  //still need to add logic here for status messages

  const responseTwo = await axios.request(submissionGet);
  return responseTwo.data.stdout
}