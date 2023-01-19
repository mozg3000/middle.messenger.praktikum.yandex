import type { Dispatch } from '../../core/';
import { UserApi } from '../../lib/api/user/UserApi';

type ProfilePayload = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export const updateProfile = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: ProfilePayload
) => {
  dispatch({ isLoading: true, profileFormError: null })
  const client = new UserApi()
  try {
    const userInfo = await client.updateProfile(action)
    dispatch({ user: userInfo } as Partial<AppState>) // eslint-disable-line no-undef
    dispatch({ isLoading: false })
  } catch (e) {
    console.log(e)
    dispatch({ isLoading: false, profileFormError: e.response.reason })
  }
}

export const changeAvatar = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: FormData
) => {
  dispatch({ isLoading: true, profileFormError: null })
  const client = new UserApi()
  try {
    await client.changeAvatar(action)
  } catch (e) {
    console.log(e)
    dispatch({ isLoading: false, profileFormError: e.response.reason })
  }
}
