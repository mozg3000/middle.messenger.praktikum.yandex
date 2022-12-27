import { Block, registerComponent } from '../../core';
import { FormRegister } from '../../modules/auth';

registerComponent(FormRegister)

interface RegisterPageProps {}

const RegisterPage = class extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage'
  protected render(): string {
    //language=hbs
    return `<main>
      {{{ FormRegister }}}
    </main>`
  }
}
export { RegisterPage }
