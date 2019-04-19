import axios from 'axios';

const select = state => state.tokens.accessToken;

const listener = () => {
  const jwt = select(store.getState());
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

const fetcher = axios.create({
  baseURL: 'https://bstrading-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

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
