import type { Dispatch } from '../../core/';
import { UserApi } from '../../lib/api/user/UserApi';

type UserChangePasswordPayload = {
  oldPassword: string,
  newPassword: string
}

export const changeUserPassword = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: UserChangePasswordPayload
) => {
  dispatch({ isLoading: true, changePasswordFormError: null })
  const client = new UserApi()
  try {
    await client.changeUserPassword(action)
    dispatch({ isLoading: false })
  } catch (e) {
   console.log(e)
    dispatch({ isLoading: false, changePasswordFormError: e.response.reason })
  }
}
