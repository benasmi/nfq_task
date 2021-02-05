import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from '../utils/cookieService';

/**
 * Formed axios request
 * @param options
 * @param authorize
 */
const request = async function (options: AxiosRequestConfig, authorize = true) {
  const token = await getCookie('jwt');
  const header: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (authorize) {
    header.Authorization = `Bearer ${token}`;
  }

  const client = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: header,
  });

  const onSuccess = function (response: AxiosResponse) {
    console.log('Request Successful!', response);
    return response;
  };

  const onError = async function (error: AxiosError) {
    if (error.response) {
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      console.debug('Error Message:', error.message);
    }

    if (error.response?.status === 403) {
      // refresh jwt token
    }
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};

const getRequest = function (path: string, requestParams = '', authorize = true, withCredentials = false): AxiosPromise {
  return request(
    {
      url: path + requestParams,
      method: 'GET',
      withCredentials: withCredentials,
    },
    authorize,
  );
};

const postRequest = function (path: string, payload: string, requestParams = '', authorize = true, withCredentials = false): AxiosPromise {
  return request(
    {
      url: path + requestParams,
      method: 'POST',
      data: payload,
      withCredentials: withCredentials,
    },
    authorize,
  );
};

const putRequest = function (path: string, payload: string, requestParams = '', authorize = true, withCredentials = false): AxiosPromise {
  return request(
    {
      url: path + requestParams,
      method: 'PUT',
      data: payload,
      withCredentials: withCredentials,
    },
    authorize,
  );
};

const deleteRequest = function (path: string, requestParams = '', authorize = true, withCredentials = false): AxiosPromise {
  return request(
    {
      url: path + requestParams,
      method: 'DELETE',
      withCredentials: withCredentials,
    },
    authorize,
  );
};

const RequestType = {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
};

export default RequestType;
