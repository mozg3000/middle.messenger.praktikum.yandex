import { Rule } from './Rule'

type LengthProps = { 'min': string, 'max': string }

const LengthRule = class extends Rule {
  private _minLength: number;
  private _maxLength: number | undefined;
  private _messages: LengthProps;
  constructor(minLength: number, _messages: LengthProps, maxLength?: number) {
    super('length')
    this._messages = _messages;
    this._maxLength = maxLength;
    this._minLength = minLength
  }
  check(value: string): boolean {

    if (value.length < this._minLength){
      this._message = this._messages.min
      return false
    }
    if (this._maxLength && (value.length > this._maxLength)) {
      this._message = this._messages.max
      return false
    }
    return  true
  }
}
export { LengthRule }
