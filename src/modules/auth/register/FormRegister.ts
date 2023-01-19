import { Block, registerComponent } from '../../../core';
import { Button, InputGroup, Link } from '../../../components/controls';
import { initProps } from '../register/initProps';
import { Validator } from '../../../lib/validators';
import { ruleSet } from './RegisterRuleSet';
import { register } from '../../../services/user/auth';

registerComponent(InputGroup)
registerComponent(Button)
registerComponent(Link)

interface FormRegisterProps {
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
  passwordError?: boolean,
  passwordErrorMessage?: string,
  passwordRepeatTitle?: string,
  passwordRepeatInputId?: string,
  passwordRepeatInputName?: string,
  passwordRepeatInputType?: string,
  passwordRepeatError?: boolean,
  passwordErrorRepeatMessage?: string,
  loginLinkText?: string,
  loginLinkUrl?: string,
  loginLinkClassName?: string,
  loginError?: boolean,
  loginErrorMessage?: string,
  emailInputType?: string,
  emailInputName?: string,
  emailInputId?: string,
  emailTitle?: string,
  emailError?: boolean,
  emailErrorMessage?: string,
  firstnameTitle?: string,
  firstnameInputId?: string,
  firstnameInputName?: string,
  firstnameInputType?: string,
  firstnameError?: boolean,
  firstnameErrorMessage?: string,
  secondnameTitle?: string,
  secondnameInputId?: string,
  secondnameInputName?: string,
  secondnameInputType?: string,
  secondnameError?: boolean,
  secondnameErrorMessage?: string,
  phoneTitle?: string,
  phoneInputId?: string,
  phoneInputName?: string,
  phoneInputType?: string,
  phoneError?: boolean,
  phoneErrorMessage?: string,
  handleClick?: (event: Event) => void // eslint-disable-line no-unused-vars
  handleFocus?: () => void
  handleBlur?: () => void
  handleChange?: () => void
}

const FormRegister = class extends Block<FormRegisterProps> {
  static componentName = 'FormRegister'
  private _validator: Validator

  constructor() {
    super({
      ...initProps,
      handleClick: (event: Event) => {
        if (this.validateInputs()) {
          const registerFormData: FormData = new FormData(document.forms.register)
          window.store.dispatch(register, Object.fromEntries(registerFormData))
        }
        event.preventDefault()
      },
      handleFocus: () => this.validateInputs(),
      handleBlur: () => this.validateInputs(),
      handleChange: () => {
        const refs: { [p: string ]: Block } = this.refs
        for (const ref: string in refs) {
          if (refs[ref].refs && refs[ref].refs.errorBlock) {
            refs[ref].refs.errorBlock.props.message = ''
          }
        }
      }
    })
    this._validator = new Validator(ruleSet)
  }
  validateInputs():boolean {
    const refs: { [p: string ]: Block } = this.refs
    let error: boolean = false
    for (const ref: string in refs) {
      const inputComponent: Nullable<Block> = refs[ref].refs.input // eslint-disable-line no-undef
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
    this.refs[refName].refs.errorBlock.props.error = true // eslint-disable-line
    this.refs[refName].refs.errorBlock.props.message = this._validator.getFirstError(type)
  }
  protected render(): string {
    //language=hbs
    return `
    <form name="register" method="post" action="/register" class="form form-register ma flex d-column f-between">
      <div class="form__top mt-40">
        <h1 class="form-title t-center">Регистрация</h1>
        <div class="form-group flex d-column mt-30">
        {{{
          InputGroup
            title=emailTitle
            id=emailInputId
            name=emailInputName
            type=emailInputType
            error=emailError
            message=emailErrorMessage
            value=emailInputValue
            focus=handleFocus
            blur=handleBlurv
            change=handleChange
            ref='emailInputRef'
        }}}
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
            blur=handleBlurv
            change=handleChange
            ref='loginInputRef'
        }}}
        {{{
          InputGroup
            title=firstnameTitle
            id=firstnameInputId
            name=firstnameInputName
            type=firstnameInputType
            error=firstnamerror
            message=firstnameErrorMessage
            value=firstnameInputValue
            focus=handleFocus
            blur=handleBlurv
            change=handleChange
            ref='firstnameInputRef'
        }}}
        {{{
          InputGroup
            title=secondnameTitle
            id=secondnameInputId
            name=secondnameInputName
            type=secondnameInputType
            error=secondnameError
            message=secondnameErrorMessage
            value=firstnameInputValue
            focus=handleFocus
            blur=handleBlurv
            change=handleChange
            ref='secondnameInputRef'
        }}}
        {{{
          InputGroup
            title=phoneTitle
            id=phoneInputId
            name=phoneInputName
            type=phoneInputType
            error=phoneError
            message=phoneErrorMessage
            value=firstnameInputValue
            focus=handleFocus
            blur=handleBlurv
            change=handleChange
            ref='phoneInputRef'
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
            blur=handleBlurv
            change=handleChange
            ref='passwordInputRef'
        }}}
        {{{
          InputGroup
            title=passwordRepeatTitle
            id=passwordRepeatInputId
            name=passwordRepeatInputName
            type=passwordRepeatInputType
            error=passwordRepeatError
            message=passwordErrorRepeatMessage
            focus=handleFocus
            blur=handleBlurv
            change=handleChange
            ref='passwordRepeatInputRef'
        }}}
        </div>
      </div>
      <div class="form__controls flex d-column mt-40">
        {{{
          Button
            type=btnType
            className=btnClassName
            title=btnTitle
            onClick=handleClick
        }}}
        {{{
          Link 
            text=loginLinkText
            url="javascript:window.router.go('/')" 
            className=loginLinkClassName
        }}}
      </div>
    </form>`
  }
}
export { FormRegister }
