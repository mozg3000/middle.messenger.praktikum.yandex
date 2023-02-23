import { PathRouter, Store } from '../../core';
import { defaultState } from '../../store';
import { initRouter } from '../../router';
import { login } from '../user/auth';
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
describe('services/auth', () => {
  const { store } = init()
  it('should set user and switch to chats screen', async function () {
    store.dispatch(login)
    await  waitFor(() => {
      expect(store.getState().user).toEqual({
        id: 12345,
        login: 'luka',
        first_name: 'Joe',
        second_name: 'Dow',
        display_name: 'Dj',
        avatar: '/path/to/resource',
        phone: '+79999999999',
        email: 'go@fk.ys'
      })
      expect(store.getState().screen).toEqual('chats')
    })
  })
})

