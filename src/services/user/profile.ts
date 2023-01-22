import { UserApi } from '../../lib/api/user/UserApi';
import AppState from '../../../typings/app';
import { Action } from '../../core/Store';

type ProfilePayload = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export const updateProfile: Action<AppState, ProfilePayload> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true, profileFormError: null })
  const client = new UserApi()
  try {
    const userInfo = await client.updateProfile(action)
    dispatch({ user: userInfo } as Partial<AppState>) // eslint-disable-line no-undef
    dispatch({ isLoading: false })
  } catch (e) {
    console.log(e)
    // dispatch({ isLoading: false, profileFormError: e.response.reason })
  }
}

export const changeAvatar: Action<AppState, FormData> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true, profileFormError: null })
  const client = new UserApi()
  try {
    const userInfo = await client.changeAvatar(action)
    dispatch({ user: userInfo })
  } catch (e) {
    console.log(e)
    // dispatch({ isLoading: false, profileFormError: e.response.reason })
  }
}
