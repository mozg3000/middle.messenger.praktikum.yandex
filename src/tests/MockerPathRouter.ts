import { PathRouter } from '../core/router/PathRouter';

export class MockedPathRouter extends PathRouter {
  go(hash: string) {
    window.location.pathname = hash
    this.onRouteChange()
  }
}
