import { Block } from '../../core';

const NotFound = class extends Block {
  static componentName = 'NotFound'
  protected render(): string {
    //language=hbs
    return `
      <div>
        <h1>Page Not Found</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </div>`
  }
}
export { NotFound }
