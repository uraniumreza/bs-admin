import api from './api';
class Auth {
  login = (phone, password) => {
    return api
      .post(`/auth/login`, {
        phone,
        password
      })
      .then(res => {
        if ((res.data && res.data.error) || (res.role && res.role !== 'admin')) {
          return Promise.resolve({
            loggedIn: false
          });
        } else {
          if (res.token && res.token.accessToken && res.token.expiresIn) {
            this.setToken(res.token.accessToken, res.token.expiresIn);
            return Promise.resolve({
              loggedIn: true
            });
          }
        }
      });
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    try {
      const expiresIn = localStorage.getItem('expiresIn');
      const expiresInTimeStamp = new Date(expiresIn);
      const nowTimeStamp = Date.now();
      if (nowTimeStamp > expiresInTimeStamp) {
        return true;
      } else return false;
    } catch (err) {
      console.log('expired check failed! Line 42: AuthService.js');
      return false;
    }
  };

  setToken = (idToken, expiresIn) => {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expiresIn', expiresIn);
  };

  getToken = () => {
    return localStorage.getItem('id_token');
  };

  logout = cb => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiresIn');
    cb();
  };
}

export default new Auth();
