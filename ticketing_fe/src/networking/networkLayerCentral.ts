import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Formed axios request
 * @param options
 * @param contentType
 */
const request = async function (options: AxiosRequestConfig) {
  // const token = await CookieService.getAccessToken([SCOPES.AUTH]);
  const token = '123';
  const header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${token}`,
  };

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

const getRequest = function (path: string, requestParams = ''): AxiosPromise {
  return request({
    url: path + requestParams,
    method: 'GET',
  });
};

const postRequest = function (path: string, payload: string, requestParams = ''): AxiosPromise {
  return request({
    url: path + requestParams,
    method: 'POST',
    data: payload,
  });
};

const putRequest = function (path: string, payload: string, requestParams = ''): AxiosPromise {
  return request({
    url: path + requestParams,
    method: 'PUT',
    data: payload,
  });
};

const deleteRequest = function (path: string, requestParams = ''): AxiosPromise {
  return request({
    url: path + requestParams,
    method: 'DELETE',
  });
};

const RequestType = {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
};

export default RequestType;
