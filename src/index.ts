import { PathRouter, CoreRouter, Store } from './core';
import { defaultState } from './store';
import { initRouter } from './router';
import { initApp } from './services/infrastructure/initApp';

import './styles/styles.css';

declare global {
  interface Window {  // eslint-disable-line
    store: Store<AppState>;  // eslint-disable-line no-undef
    router: CoreRouter;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState); // eslint-disable-line no-undef
  const router = new PathRouter();
  window.router = router;
  window.store = store;

  store.on('changed', (prevState, nextState) => {
    console.log(
      '%cstore updated',
      'background: #222; color: #bada55',
      nextState,
    );
  });


  initRouter(router, store);


  store.dispatch(initApp);

});

