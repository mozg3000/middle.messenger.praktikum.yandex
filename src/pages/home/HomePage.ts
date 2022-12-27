import { Block } from '../../core';

interface HomePageProps {}

const HomePage = class extends Block<HomePageProps> {

  static componentName = 'HomePage'
  protected render(): string {
    //language=hbs
    return `
    <main>
      <ul>
        <li><a href="/login">Login page</a></li>
        <li><a href="/register">Register page</a></li>
        <li><a href="/profile">Profile page</a></li>
        <li><a href="/chat">Chat page</a></li>
        <li><a href="/404">Not Found page</a></li>
        <li><a href="/500">Server error page</a></li>
      </ul>
    </main>`
  }
}
export { HomePage }
