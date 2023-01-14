import { Block, registerComponent } from '../../core';
import { FormLogin } from '../../modules/auth';

registerComponent(FormLogin);

interface LoginPageProps {}

const LoginPage = class extends Block<LoginPageProps> {
  static componentName = 'LoginPage'
   render(): string {
    //language=hbs
    return `<main>
      {{{ FormLogin }}}
    </main>`
  }
}
export { LoginPage }
