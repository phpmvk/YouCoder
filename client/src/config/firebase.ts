import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from './config';

export const firebaseApp = initializeApp(config.firebaseConfig);
export const auth = getAuth(firebaseApp);
