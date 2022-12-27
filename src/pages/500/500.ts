import { Block } from '../../core';

interface ServerErrorProps {}

const ServerError = class extends Block<ServerErrorProps> {
  static componentName = 'ServerError'
  protected render(): string {
    //language=hbs
    return `
    <main>
      <h1>Something went wrong</h1>
      <p>Sorry, but the page you were trying to view could not be load from server because of an error.</p>
    </main>`
  }
}
export { ServerError }
