import type { Dispatch } from '../../core/';
import { AuthApi } from '../../lib/api/auth/AuthApi';

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

export const login = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: LoginPayload,
) => {
  dispatch({ isLoading: true, loginFormError: null })
  const client = new AuthApi()
  try {
    await client.login(action)
    const userInfo = await client.userInfo()
    dispatch({ user: userInfo } as Partial<AppState>) // eslint-disable-line no-undef
    dispatch({ isLoading: false })
    window.router.go('/chats')
  } catch (e) {
    console.log(e)
    const data = JSON.parse(e.response)
    if (data.reason === "User already in system") {
      dispatch({ isLoading: false })
      window.router.go('/chats')
    }
    dispatch({ isLoading: false, loginFormError: e.response.reason })
    // dispatch(logout)
  }
}

export const logout = async (dispatch: Dispatch<AppState>) => { // eslint-disable-line no-undef
  dispatch({ isLoading: true })
  const client = new AuthApi()
  await client.logout();
  dispatch({ isLoading: false, user: null })
  window.router.go('/')
}

export const register = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: RegisterPayload
) => {
  dispatch({ isLoading: true, registerFormError: null })
  const client = new AuthApi()
  try {
    await client.register(action)
    dispatch({ isLoading: false })
    window.router.go('/chats')
  } catch (e) {
    console.log(e)
    dispatch({ isLoading: false, registerFormError: e.response.reason })
  }
}
