import { Block } from '../../core';

interface InputProps {
  focus: (event: Event) => void, // eslint-disable-line no-unused-vars
  type: string,
  name: string,
  className: string,
  placeholder: string,
  value: string,
  id: string
}

const Input = class extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focus: props.focus
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
export { Input }
