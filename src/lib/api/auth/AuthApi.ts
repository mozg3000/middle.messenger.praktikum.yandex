import { BaseApi } from '../BaseApi';

type LoginRequestData = {
  login: string;
  password: string;
};

class AuthApi extends BaseApi {
  login(data: LoginRequestData) {
    return this.client.request(
      '/auth/signin',
      {
        method: 'POST',
        data
      }
    )
  }
  logout() {
    return this.client.request(
      '/auth/logout',
      {
        method: 'POST'
      }
    )
  }

  userInfo() {
    return this.client.request('/auth/user')
  }
}

export { AuthApi }
