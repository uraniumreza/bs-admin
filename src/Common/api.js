import axios from 'axios';

const fetcher = axios.create({
  baseURL: 'https://bstrading-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': undefined
  }
});

fetcher.interceptors.request.use(
  function(config) {
    config.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const api = {
  post: (url, data) =>
    fetcher
      .post(url, data)
      .then(response => response.data)
      .catch(error => error.response),

  get: url =>
    fetcher
      .get(url)
      .then(response => response.data)
      .catch(error => error.response),

  patch: (url, data) =>
    fetcher
      .patch(url, data)
      .then(response => response.data)
      .catch(error => error.response),

  delete: url =>
    fetcher
      .delete(url)
      .then(response => response.data)
      .catch(error => error.response)
};

export default api;
