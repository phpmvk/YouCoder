import axios from 'axios';
import { CodeToExecute } from '../../types/types';
const apiHost = process.env['X-RapidAPI-Host']
const apiKey = process.env['X-RapidAPI-Key']

//fix type here
export async function sendCode(codeObject: CodeToExecute) {
  const url = apiHost + '/submissions'
  const config = {
    params: {
      base64_encoded: 'false', //<-- update this when we set up encoding in frontEnd
      fields: '*'
    },
    header: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  } 

  const body = {
    language_id: codeObject.language_id,
    source_code: codeObject.source_code,
    stdin: codeObject.stdin,
  }

  const response = await axios.post(url, body, config)
  console.log(response)


}