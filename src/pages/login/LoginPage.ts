import { Block, registerComponent } from '../../core';
import { FormLogin } from '../../modules/auth';

registerComponent(FormLogin);
const LoginPage = class extends Block {
  static componentName = 'LoginPage'
   render(): string {
    //language=hbs
    return `<div>
      {{{ FormLogin }}}
    </div>`
  }
}
export { LoginPage }
