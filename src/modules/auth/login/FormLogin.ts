import { Block, registerComponent } from '../../../core';
import { initProps } from './initProps';
import { Button, InputGroup, Link } from '../../../components/controls';
import { LengthRule, Validator, RequireRule, RegExRule } from '../../../lib/validators';

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
        this.refs.loginInputRef.refs.errorBlock.props.message = ''
      }
    })
    this._validator = new Validator({
      login: [
        new RequireRule(),
        new LengthRule(3, {min: 'Слишком короткое имя'}),
        new RegExRule(/^[A-Za-zА-Яа-я]/, {contain: 'Должен начинаться с букв'}, true),
        new RegExRule(/^\w*([&%$~^\[\]{}?!\/\/]*)\w*$/, {notContain: 'Содержит недопустимые символы'}) // eslint-disable-line
      ],
      pwd: [
        new RequireRule(),
        new LengthRule(8, {min: 'Слишком короткий пароль'})
      ]
    })
  }

  validateInputs():void {
    const loginValue = this.getInputValue('loginInputRef')
    const loginError = !this._validator.validate('login', loginValue)
    if (loginError) {
      this.setError('loginInputRef', 'login')
    }
    const pwdValue = this.getInputValue('pwdInputRef')
    const pwdError = !this._validator.validate('pwd', pwdValue)
    if (pwdError) {
      this.setError('pwdInputRef', 'pwd')
    }
  }
  getInputValue(refName: string):string {
    return this.refs[refName].refs.input._element.value
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
                id=loginInputId
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
                title=pwdTitle
                id=pwdInputId
                name=pwdInputName
                type=pwdInputType
                id=pwdInputId
                error=pwdError
                message=pwdErrorMessage
                ref='pwdInputRef'
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

