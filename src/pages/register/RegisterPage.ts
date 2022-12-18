import { Block, registerComponent } from '../../core';
import { FormRegister } from '../../modules/auth';

registerComponent(FormRegister)

const RegisterPage = class extends Block {
  protected render(): string {
    //language=hbs
    return `<div>
      {{{ FormRegister }}}
    </div>`
  }
}
export { RegisterPage }
