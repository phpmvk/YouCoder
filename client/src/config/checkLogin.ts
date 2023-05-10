import http from '../services/userApi';
import { rootUser, setUser } from '../redux/userSlice';
import { useAppDispatch } from '../redux/hooks';

export async function login(token: string) {
  http
    .creatorLogin(token)
    .then((response) => {
      console.log('user from backend response: ', response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
