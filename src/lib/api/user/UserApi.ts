import { BaseApi } from '../BaseApi';

type UpdateProfileData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

type UserPassword = {
  oldPassword: string,
  newPassword: string
}

class UserApi extends BaseApi {
  updateProfile(data: UpdateProfileData) {
    return this.client.request(
      '/user/profile',
      {
        method: 'PUT',
        data
      }
    )
  }
  changeUserPassword(data: UserPassword) {
    return this.client.request(
      '/user/password',
      {
        method: "PUT",
        data
      }
    )
  }

  changeAvatar(data: FormData) {
    return this.client.request(
      '/user/profile/avatar',
      {
        method: 'PUT',
        data,
        isMultiPart: true
      }
    )
  }
}

export { UserApi }
