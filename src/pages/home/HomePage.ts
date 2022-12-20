import { Block } from '../../core';

const HomePage = class extends Block {
  protected render(): string {
    //language=hbs
    return `
    <ul>
        <li><a href="/login">Login page</a></li>
        <li><a href="/register">Register page</a></li>
        <li><a href="/profile">Profile page</a></li>
    </ul>`
  }
}
export { HomePage }
