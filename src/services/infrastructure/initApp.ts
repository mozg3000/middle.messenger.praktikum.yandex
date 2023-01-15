import type { Dispatch } from '../../core';
import { AuthApi } from '../../lib/api/auth/AuthApi';

export async function initApp(dispatch: Dispatch<AppState>) { // eslint-disable-line no-undef
  try {
    console.log('Init App')
    const client = new AuthApi()
    const r = await client.userInfo()
    console.log(r)
  } catch (err) {
    console.log('error', err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
