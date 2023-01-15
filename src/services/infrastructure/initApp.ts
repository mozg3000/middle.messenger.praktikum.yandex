import type { Dispatch } from '../../core';

export async function initApp(dispatch: Dispatch<AppState>) { // eslint-disable-line no-undef
  try {
    console.log('Init App')
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
