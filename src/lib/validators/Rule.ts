const Rule = class {
  private _name: string = ''
  protected _message: string = ''
  constructor(name: string) {
    this._name = name
  }
  //@ts-ignore
  check(value: string) {  // eslint-disable-line no-unused-vars
    this._message = ''
    return false
  }
  getMessage(): string {
    return this._message
  }
  getName(): string {
    return this._name
  }
}

export { Rule }
