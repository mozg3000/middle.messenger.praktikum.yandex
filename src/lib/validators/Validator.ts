import { Rule } from './Rule';

const Validator = class {
  private _rules: { [key: string]: InstanceType<typeof Rule>[] } = {}
  private _messages: { [type: string]: { [key: string]: string[] } } = {}
  constructor(rules: { [key: string]: InstanceType<typeof Rule>[] }) {
    this._rules = { ...rules }
  }
  validate(type: string, value: string): boolean {
    this._messages = {}
    let valid: boolean = false
    const rules: InstanceType<typeof Rule>[] = this._rules[type] ?? []
    for (const rule of rules) {
      valid = rule.check(value)
      if (!valid){
        this._messages[type] = {
          [rule.getName()]: [rule.getMessage()]
        }
        break
      }
    }
    return valid
  }
  getFirstError(type: string): string {
    const keys: string[] = Object.keys(this._messages[type] === undefined ? [] : this._messages[type])
    return keys.length > 0 ? this._messages[type][keys[0]][0] : ''
  }
}
export { Validator }
