import { Rule } from './Rule'

const RegExRule = class extends Rule {

  private _messages: { [min: string]: string, [max: string]: string };
  private _regEx: {[Symbol.match](string: string): (RegExpMatchArray | null)}; // eslint-disable-line no-unused-vars
  private _contain: boolean;
  constructor(regEx: {[Symbol.match](string: string): (RegExpMatchArray | null)}, _messages: {[notContain:string]:string, [contain:string]:string}, contain:boolean = false) {  // eslint-disable-line no-unused-vars
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
