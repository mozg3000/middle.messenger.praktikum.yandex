import { Rule } from './Rule';

const Validator = class {
  private _rules: { key: Rule[] } = {}
  private _messages: { [type: string]: { [key: string]: string[] } } = {}
  constructor(rules: { [key: string]: Rule[] }) {
    this._rules = { ...rules }
  }
  validate(type: string, value: string) {
    this._messages = {}
    let valid: boolean = false
    for (const rule of this._rules[type]) {
      const valid = rule.check(value)
      if (!valid){
        this._messages[type] = {
          [rule.getName()]: (rule.getMessage())
        }
        break
      }
    }
    return valid
  }
  getFirstError(type: string): string[] {
    const keys = Object.keys(this._messages[type] === undefined ? [] : this._messages[type])
    return keys.length > 0 ? this._messages[type][keys[0]] : []
  }
}
export { Validator }
