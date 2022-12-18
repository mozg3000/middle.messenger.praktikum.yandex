import { Rule } from './Rule';

const Validator = class {
  private _rules: { key: Rule[] } = {}
  private _messages: { [type: string]: { [key: string]: string[] } } = {}
  constructor(rules: { [key: string]: Rule[] }) {
    this._rules = { ...rules }
  }
  validate(type: string, value: string): boolean {
    this._messages = {}
    let valid: boolean = false
    const rules: Rule[] = this._rules[type] ?? []
    for (const rule: Rule of rules) {
      const valid: boolean = rule.check(value)
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
    const keys: string[] = Object.keys(this._messages[type] === undefined ? [] : this._messages[type])
    return keys.length > 0 ? this._messages[type][keys[0]] : []
  }
}
export { Validator }
