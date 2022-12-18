import { Block, registerComponent } from '../../../core';
import { initProps } from './initProps';
import { Button, InputGroup, Link } from '../../../components/controls';
import { Validator } from '../../../lib/validators';
import { ruleSet } from './LoginRuleSet';

registerComponent(InputGroup)
registerComponent(Button)
registerComponent(Link)

const FormLogin = class extends Block {
  private _validator: Validator
  constructor() {
    super({
      ...initProps,
      handleClick: (event: Event) => {
        event.preventDefault()
        this.validateInputs()
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
  validateInputs():void {
    const refs: { [p: string ]: Block } = this.refs
    for (const ref: string in refs) {
      const inputComponent: Nullable<Block> = refs[ref].refs.input // eslint-disable-line no-undef
      if (inputComponent) {
        const inputElement: Nullable<HTMLInputElement> = inputComponent._element as HTMLInputElement // eslint-disable-line no-undef
        const value: string = inputElement.value
        const name: string = inputElement.name
        let error: boolean = !this._validator.validate(name, value)
        if (error) {
          this.setError(ref, name)
        }
      }
    }
  }
  setError(refName: string, type: string):void {
    this.refs[refName].refs.errorBlock.props.error = true // eslint-disable-line
    this.refs[refName].refs.errorBlock.props.message = this._validator.getFirstError(type)
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

