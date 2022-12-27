import { Rule } from './Rule'

const RequireRule = class extends Rule {
  constructor() {
    super('require');
  }
  check(value: string): boolean {
    const valid = value ? value.length > 0 : false
    if (!valid) {
      this._message = 'Необходимо заполнить это поле'
    }
    return valid
  }
}
export { RequireRule }
