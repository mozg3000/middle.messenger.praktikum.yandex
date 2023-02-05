export interface CoreRouter {
  start(): void

  use(path: string, callback: () => void): CoreRouter // eslint-disable-line no-unused-vars

  go(path: string): void // eslint-disable-line no-unused-vars

  back(): void

  forward(): void
}
