import { username, password } from '../token';
import axios from '../http';

export const handleLogin = () => {
  return axios.post('/api/v1/auth/login', {
    username,
    password
  })
}
