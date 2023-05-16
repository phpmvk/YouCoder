import axios from 'axios';
import { auth } from '../config/firebase';

// const baseURL = 'http://localhost:3000';
const baseURL = 'https://yc-serv.fly.dev/';

export const protectedHttp = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

const isTokenExpired = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedToken = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(atobPolyfill(base64), (c) => c.charCodeAt(0))
      )
    );
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp < currentTime;
  } catch (e) {
    return false;
  }
};

const atobPolyfill = (base64: string) => {
  if (typeof atob === 'function') {
    return atob(base64);
  } else {
    const buffer = Buffer.from(base64, 'base64');
    return buffer.toString('binary');
  }
};

protectedHttp.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('******* auth ********', auth);
      console.log('isTokenExpired(token)', isTokenExpired(token));
      console.log('auth.currentUser', auth.currentUser);
      if (isTokenExpired(token) && auth.currentUser) {
        console.log('we are here !!!!!!');
        const refreshedToken = await auth.currentUser.getIdToken(true);
        console.log('got a fresh token', refreshedToken);
        localStorage.setItem('token', refreshedToken);
        config.headers.Authorization = `Bearer ${refreshedToken}`;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default baseURL;
