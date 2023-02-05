import { Rule } from './Rule'

type MessageProps = {
  'min': string,
  'max': string,
  'contain': string,
  'notContain': string
}

const RegExRule = class extends Rule {

  private _messages: MessageProps;
  private _regEx:  string | RegExp; // eslint-disable-line no-unused-vars
  private _contain: boolean;
  constructor(regEx:  string | RegExp, _messages: MessageProps, contain:boolean = false) {  // eslint-disable-line no-unused-vars
    super('regEx')
    this._messages = _messages;
    this._regEx = regEx
    this._contain = contain;
  }
  check(value: string): boolean {
    let regResult:  RegExpMatchArray | null = value.match(this._regEx)
    let valid: boolean = true
    if (this._contain) {
      if (!regResult) {
        valid = false
        this._message = this._messages.contain
      }
    } else {
      if (regResult && regResult[1] !== '') {
        valid = false
        this._message = this._messages.notContain
      }
    }

    return valid
  }
}
export { RegExRule }
