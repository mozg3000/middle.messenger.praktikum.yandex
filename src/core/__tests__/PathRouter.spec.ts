import { PathRouter } from '../router/PathRouter';
import { Store } from '../Store';
import { defaultState } from '../../store';
import { initRouter } from '../../router';

function init() {
  const store = new Store<AppState>(defaultState) // eslint-disable-line no-undef
  const router = new PathRouter()
  document.body.innerHTML = '<div id="app"></div>'
  initRouter(router, store)

  return {
    router,
    store
  }
}

const AllRoutes = [
  '/',
  '/login',
  '/register',
  '/profile',
  '/chats',
  '*'
]

describe('PathRoute/routes', () => {

  const { router } = init()
  const routes = router.getRoutes()
  const routesPaths = Object.keys(routes)

  it('Should have exact length', () => {
    expect(routesPaths.length).toEqual(6)
  })

  it('Should have routes', () => {
    AllRoutes.map(r => expect(routesPaths).toContain(r))
  })
})

describe('PathRouter/navigation', () => {
  const { router, store } = init()

  it('Should have screen of null', () => {
    expect(store.getState().screen).toEqual(null)
  })

  it('Should switch to login screen', () => {
    expect(store.getState().screen).toEqual(null)
    router.go('/')
    expect(store.getState().screen).toEqual('login')
  })

  it('Should redirect to login', () => {
    router.go('/chats')
    console.log(store.getState().screen)
    expect(store.getState().screen).toEqual('login')
  })

  it('Should autologin', () => {
    store.dispatch({ user: {
      id: 1213,
      first_name: 'dfgsd',
      second_name: 'dsfgsdf',
      login: 'sdfgsd',
      display_name: 'dsfgh',
      avatar: '/df/sdfd.jpg',
      phone: '+7925658963',
      email: 'sdf@sdrfg.ru'
    }})
    router.go('/')
    expect(store.getState().screen).toEqual('chats')
  })
})
