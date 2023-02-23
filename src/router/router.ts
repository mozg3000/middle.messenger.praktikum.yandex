import { Store, renderDOM, CoreRouter } from '../core';
import { getScreenComponent, Screens } from '../lib/infrastructure/screenList';

export const routes = [
  {
    path: '/',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/register',
    block: Screens.Register,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/chats',
    block: Screens.Chats,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.NotFound,
    shouldAuthorized: false,
  },
]

export function initRouter(router: CoreRouter, store: Store<AppState>) { // eslint-disable-line no-undef
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(window.store ? window.store.getState().user : store.getState().user)
      const currentScreen = Boolean(window.store ? window.store.getState().screen : store.getState().screen)

      if (isAuthorized) {
        if (route.path === '/') {
          router.go('/chats')
          return
        }
        // console.log()
        store.dispatch({ screen: route.block })
        return
      }
      if (!currentScreen) {
        window.history.pushState({}, '', '/')
        store.dispatch({ screen: Screens.Login })
        return
      }
      if (!route.shouldAuthorized) {
        store.dispatch({ screen: route.block })
      }
    })
  })

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start()
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen)
      renderDOM(new Page({}));
      document.title = `${Page.componentName}`
    }
  })
}
