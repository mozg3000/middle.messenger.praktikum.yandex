import type { Dispatch } from '../../core';
import { AuthApi } from '../../lib/api/auth/AuthApi';

export async function initApp(dispatch: Dispatch<AppState>) { // eslint-disable-line no-undef
  try {
    const client = new AuthApi()
    const userinfo = await client.userInfo()
    dispatch({ user: userinfo as User }) // eslint-disable-line no-undef
  } catch (err) {
    console.log('error', err)
  } finally {
    dispatch({ appIsInited: true })
  }
}
