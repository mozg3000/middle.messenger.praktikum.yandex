export type Listener<T extends unknown[] = any[]> = (...args: T) => void; // eslint-disable-line no-unused-vars

export default class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, any[]>> { // eslint-disable-line no-unused-vars
  private listeners: { [key in E]?: Listener<M[E]>[] } = {}; // eslint-disable-line no-unused-vars
  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback,
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
      // throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }
}
