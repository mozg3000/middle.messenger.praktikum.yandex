import { Block } from '../../core';

const ServerError = class extends Block {
  static componentName = 'ServerError'
  protected render(): string {
    //language=hbs
    return `
    <div>
      <h1>Something went wrong</h1>
      <p>Sorry, but the page you were trying to view could not be load from server because of an error.</p>
    </div>`
  }
}
export { ServerError }
