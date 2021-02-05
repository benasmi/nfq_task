import { AxiosPromise } from 'axios';
import RequestType from '../networkLayerCentral';

interface AuthI {
  username: string;
  password: string;
}

const login = (auth: AuthI): AxiosPromise<any> => RequestType.postRequest(`/users/login`, JSON.stringify(auth));
const profile = (): AxiosPromise<any> => RequestType.getRequest(`/users/profile`);

const availableSpecialist = (): AxiosPromise<any> => RequestType.getRequest('/users/available', '', false);

export const Auth = {
  login,
  profile,

  availableSpecialist,
};
