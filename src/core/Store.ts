import EventBus from './EventBus';
/* eslint-disable */
export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State, any>,
  payload?: any,
) => void;

export type Action<State, T> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: T,
) => void;
/* eslint-disable */
export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit('changed', prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State, any>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
