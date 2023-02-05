import type { Dispatch } from '../../core/';
import { AuthApi } from '../../lib/api/auth/AuthApi';
import { Action } from '../../core/Store';
//@ts-ignore
import AppState from '../../../typings/app';

type LoginPayload = {
  login: string;
  password: string;
}

type RegisterPayload = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

//@ts-ignore
export const login: Action<AppState, LoginPayload> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true, loginFormError: null })
  let client = new AuthApi()
  try {
    await client.login(action)
    client = new AuthApi()
    const userInfo = await client.userInfo()
    dispatch({ user: userInfo } as Partial<AppState>) // eslint-disable-line no-undef
    // dispatch({ isLoading: false })
    window.router.go('/chats')
  } catch (e) {
    console.log(e)
    const data = JSON.parse((e as XMLHttpRequest).response)
    if (data.reason === "User already in system") {
      dispatch({ isLoading: false })
      window.router.go('/chats')
    }
    // dispatch({ isLoading: false, loginFormError: e.response.reason })
    // dispatch(logout)
  }
}

export const logout = async (dispatch: Dispatch<AppState>) => { // eslint-disable-line no-undef
  // dispatch({ isLoading: true })
  const client = new AuthApi()
  await client.logout();
  dispatch({ isLoading: false, user: null })
  window.router.go('/')
}

//@ts-ignore
export const register: Action<AppState, RegisterPayload> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true, registerFormError: null })
  let client = new AuthApi()
  try {
    await client.register(action)
    client = new AuthApi()
    const userInfo = await client.userInfo()
    dispatch({ user: userInfo } as Partial<AppState>) // eslint-disable-line no-undef
    dispatch({ isLoading: false })
    window.router.go('/chats')
  } catch (e) {
    console.log(e)
    // dispatch({ isLoading: false, registerFormError: e.response.reason })
  }
}
