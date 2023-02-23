import { BaseApi } from '../BaseApi';

type LoginRequestData = {
  login: string;
  password: string;
};

type RegisterRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

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
    //@ts-ignore
    return this.client.request('/auth/user')
  }

  register(data: RegisterRequestData) {
    return this.client.request(
      '/auth/signup',
      {
        method: 'POST',
        data
      }
    )
  }
}

export { AuthApi }
