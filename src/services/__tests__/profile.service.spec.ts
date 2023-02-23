import { PathRouter, Store } from '../../core';
import { defaultState } from '../../store';
import { initRouter } from '../../router';
import { updateProfile } from '../user/profile';
import { waitFor } from '@testing-library/dom';

function init() {
  const store = new Store<AppState>(defaultState) // eslint-disable-line no-undef
  const router = new PathRouter()
  window.router = router
  document.body.innerHTML = '<div id="app"></div>'
  initRouter(router, store)

  return {
    router,
    store
  }
}

describe('services/profile', () => {
  const { store } = init()

  it('should update user in the store', async function () {
    store.dispatch({
      user: {
        id: 12345,
        login: 'luka',
        first_name: 'Joe',
        second_name: 'Dow',
        display_name: 'Dj',
        avatar: '/path/to/resource',
        phone: '+79999999999',
        email: 'go@fk.ys'
      }
    })
    store.dispatch(updateProfile)
    await waitFor(() => {
      expect(store.getState().user).toEqual({
        id: 12345,
        login: 'muka',
        first_name: 'Jone',
        second_name: 'Bone',
        display_name: 'jj',
        avatar: '/path/to/resource',
        phone: '+71111111111',
        email: 'go@fk.all'
      })
    })
  });
})
