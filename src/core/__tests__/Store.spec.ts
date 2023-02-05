import { Store } from '../Store';

describe('score/Store', () => {
  it('should set state', () => {
    const store = new Store({})

    store.set({ userId: 123 })

    expect(store.getState()).toEqual({ userId: 123 })
  });

  it('should emit event after store was update', () => {
    const store = new Store({ userId: -1 })
    const mock = jest.fn()

    store.on('changed', mock);

    store.set({ userId: 123 })

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 })
  })
  it('Should call callback with store and dispatch when', () => {
    const store = new Store({ userId: -1 })
    const mock = jest.fn()

    store.dispatch(mock, 'PAYLOAD_PARAMS')

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), 'PAYLOAD_PARAMS')
    expect(mock)
  })
})
