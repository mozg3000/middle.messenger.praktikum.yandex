import { UserApi } from '../../lib/api/user/UserApi';
import { Action } from '../../core/Store';
import AppState from '../../../typings/app';

type UserChangePasswordPayload = {
  oldPassword: string,
  newPassword: string
}
// @ts-ignore
export const changeUserPassword: Action<AppState, UserChangePasswordPayload> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true, changePasswordFormError: null })
  const client = new UserApi()
  try {
    await client.changeUserPassword(action)
    // dispatch({ isLoading: false })
  } catch (e) {
   console.log(e)
    // dispatch({ isLoading: false, changePasswordFormError: e.response.reason })
  }
}
