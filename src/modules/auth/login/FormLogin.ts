import { Block, registerComponent } from '../../../core';
import { initProps } from './initProps';
import { handleClick } from './handlers';
import { Button, InputGroup, Link } from '../../../components/controls';

registerComponent(InputGroup)
registerComponent(Button)
registerComponent(Link)

const FormLogin = class extends Block {
  constructor() {
    super({
      ...initProps,
      handleClick,
      handleFocus: (event: Event) => console.log(event)
    });
  }
  protected render(): string {
    //language=hbs
    return `<form name="login" method="post" action="/login" class="form ma flex d-column f-between">
      <div class="form__top mt-40">
        <h1 class="form__title t-center">Вход</h1>
          <div class="form-group flex d-column mt-30">
            {{{
              InputGroup
                title=loginTitle
                id=loginInputId
                name=loginInputName
                type=loginInputType
                id=loginInputId
                error=loginError
                message=loginErrorMessage
                focus=handleFocus
            }}}
            {{{
              InputGroup
                title=pwdTitle
                id=pwdInputId
                name=pwdInputName
                type=pwdInputType
                id=pwdInputId
                error=pwdError
                message=pwdErrorMessage
            }}}
          </div>
      </div>
      <div class="form__controls flex d-column">
        {{{
          Button
            type=btnType
            className=btnClassName
            title=btnTitle
            onClick=handleClick
        }}}
        {{{
          Link 
            text=registerLinkText
            url=registerLinkUrl 
            className=registerLinkClassName
        }}}
      </div>
    </form>`
  }
}
export { FormLogin }

