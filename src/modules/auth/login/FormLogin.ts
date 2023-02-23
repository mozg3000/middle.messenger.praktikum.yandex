import { Block, registerComponent } from '../../../core';
import { initProps } from './initProps';
import { Button, MessageProps, InputGroup, Link } from '../../../components/controls';
import { Validator } from '../../../lib/validators';
import { ruleSet } from './LoginRuleSet';
import { login } from '../../../services/user/auth';
import { BlockProps } from '../../../core/Block';

registerComponent(InputGroup)
registerComponent(Button)
registerComponent(Link)

interface FormLoginProps {
  btnTitle?: string,
  btnType?: string,
  btnClassName?: string,
  loginInputType?: string,
  loginInputName?: string,
  loginInputId?: string,
  loginTitle?: string,
  passwordInputType?: string,
  passwordInputName?: string,
  passwordInputId?: string,
  passwordTitle?: string,
  registerLinkText?: string,
  registerLinkUrl?: string,
  registerLinkClassName?: string,
  loginError?: boolean,
  loginErrorMessage?: string,
  passwordError?: boolean,
  passwordErrorMessage?: string,
  handleClick?: (event: Event) => void // eslint-disable-line no-unused-vars
  handleFocus?: () => void
  handleBlur?: () => void
  handleChange?: () => void
}

interface FormLoginType extends HTMLCollectionOf<HTMLFormElement> {
  login: HTMLFormElement
}

const FormLogin = class extends Block<FormLoginProps> {
  static componentName = 'FormLogin'
  private _validator: InstanceType<typeof Validator>
  constructor() {
    super({
      ...initProps,
      handleClick: (event: Event) => {
        if (this.validateInputs()) {
          const loginFormData: FormData = new FormData((document.forms as FormLoginType).login)
          window.store.dispatch(login, Object.fromEntries(loginFormData))
        }
        event.preventDefault()
      },
      handleFocus: () => {
        this.validateInputs()
      },
      handleBlur: () => {
        this.validateInputs()
      },
      handleChange: () => {
        const refs: { [p: string ]: Block<BlockProps> } = this.refs
        for (const ref in refs) {
          if (refs[ref].refs && refs[ref].refs.errorBlock) {
            (refs[ref].refs.errorBlock.props as MessageProps).message = ''
          }
        }
      }
    })
    this._validator = new Validator(ruleSet)
  }
  validateInputs():boolean {
    const refs: { [p: string ]: Block<BlockProps> } = this.refs
    let error: boolean = false
    for (const ref in refs) {
      const inputComponent: Nullable<Block<BlockProps>> = refs[ref].refs.input // eslint-disable-line no-undef
      if (inputComponent) {
        const inputElement: Nullable<HTMLInputElement> = inputComponent._element as HTMLInputElement // eslint-disable-line no-undef
        const value: string = inputElement.value
        const name: string = inputElement.name
        error = !this._validator.validate(name, value)
        if (error) {
          this.setError(ref, name)
        }
      }
    }
    return !error
  }
  setError(refName: string, type: string):void {
    (this.refs[refName].refs.errorBlock.props as MessageProps).error = true;
    (this.refs[refName].refs.errorBlock.props as MessageProps).message = this._validator.getFirstError(type);
  }
  protected render(): string {
    //language=hbs
    return `<form name="login" method="post" action="/login" class="form ma flex d-column f-between">
      <div class="form__top mt-40">
        <h1 class="form-title t-center">Вход</h1>
          <div class="form-group flex d-column mt-30">
            {{{
              InputGroup
                title=loginTitle
                id=loginInputId
                name=loginInputName
                type=loginInputType
                error=loginError
                message=loginErrorMessage
                value=loginInputValue
                focus=handleFocus
                blur=handleBlur
                change=handleChange
                ref='loginInputRef'
            }}}
            {{{
              InputGroup
                title=passwordTitle
                id=passwordInputId
                name=passwordInputName
                type=passwordInputType
                id=passwordInputId
                error=passwordError
                message=passwordErrorMessage
                focus=handleFocus
                blur=handleBlur
                change=handleChange
                ref='passwordInputRef'
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
            url="javascript:window.router.go('/register')" 
            className=registerLinkClassName
        }}}
      </div>
    </form>`
  }
}
export { FormLogin }

