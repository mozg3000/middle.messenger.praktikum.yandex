import { Block } from '../../core';

interface NotFoundProps {}

const NotFound = class extends Block<NotFoundProps> {
  static componentName = 'NotFound'
  protected render(): string {
    //language=hbs
    return `
      <main>
        <h1>Page Not Found</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </main>`
  }
}
export { NotFound }
