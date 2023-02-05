import {BlockClass, renderDOM, registerComponent, Store, Block} from '../core';
import { defaultState } from '../store';
import { initRouter } from '../router';
import { MockedPathRouter } from './MockerPathRouter';
import { sleep } from '../lib/utiles/utils';
// import {ButtonProps} from "../components/controls/Button";
// import EventBus from "../core/EventBus";
// import * as Events from "events";


export type RenderBlockParams<T extends Object> = {
  Block?: BlockClass<T>
  props: T
  state?: Partial<AppState>
}
export type BlockComp = InstanceType<typeof Block>
export async function renderBlock<T extends Object, P extends BlockComp>(
  {
    Block,
    props,
    state = defaultState
  }:  RenderBlockParams<T>,
  components: Array<P>
) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component)
  })

  const store = new Store<AppState>({ ...defaultState, ...state })
  const router = new MockedPathRouter()

  window.router = router
  window.store = store

  document.body.innerHTML = '<div id="app"></div>'

  if (Block) {
    renderDOM(new Block(props as T))
  }

  initRouter(router, store);

  await sleep()
}

export async function step(name: string, callback: () => void) {
  console.log(`Step: ${name}`)
  await callback()
}
