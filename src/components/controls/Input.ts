import { Block } from '../../core';

interface InputProps {
  focus?: (event: Event) => void, // eslint-disable-line no-unused-vars
  blur?: (event: Event) => void, // eslint-disable-line no-unused-vars
  change?: (event: Event) => void, // eslint-disable-line no-unused-vars
  type: string,
  name?: string,
  className?: string,
  placeholder?: string,
  value?: string,
  id?: string,
  events?: { [key: string]: (event: Event) => void } // eslint-disable-line no-unused-vars
}

const Input = class extends Block<InputProps> {
  static componentName = 'Input'
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focus: props.focus as (event: Event) => void,
        blur: props.focus as (event: Event) => void,
        input: props.change as (event: Event) => void
      }
    });

  }
  render(): string {
    //language=hbs
    return `
      <input 
        type="{{type}}" 
        name="{{name}}" 
        placeholder="{{placeholder}}" 
        class="{{className}}" 
        id="{{id}}" 
        value="{{value}}"
      >`
  }
}
export { Input, InputProps }
