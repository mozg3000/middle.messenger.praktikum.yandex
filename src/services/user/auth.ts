import type { Dispatch } from '../../core/';
import { AuthApi } from '../../lib/api/auth/AuthApi'

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: LoginPayload,
) => {
  dispatch({ isLoading: true, loginFormError: null });

  const client = new AuthApi()

  try {
    const response = await client.login(action); // eslint-disable-line no-unused-vars
    const userInfo = await client.userInfo()
    console.log(userInfo)
    dispatch({ user: userInfo } as Partial<AppState>) // eslint-disable-line no-undef
    dispatch({ isLoading: false });
    window.router.go('/profile');
  } catch (e) {
    console.log(e)
    dispatch(logout);
    const data = JSON.parse(e.response)
    if (data.reason === "User already in system") {
      dispatch({ isLoading: false });
      window.router.go('/profile');
    }
    dispatch({ isLoading: false, loginFormError: e.response.reason });
    // dispatch(logout);
  }
};

export const logout = async (dispatch: Dispatch<AppState>) => { // eslint-disable-line no-undef
  dispatch({ isLoading: true });

  const client = new AuthApi()

  await client.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/');
};
