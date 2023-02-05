import { Block } from '../../core'

interface ButtonProps {
  onClick?: (event: Event) => void; // eslint-disable-line no-unused-vars
  type: string,
  className?: string,
  title: string,
  events?: { [key: string]: (event: Event) => void } // eslint-disable-line no-unused-vars
}

const Button = class extends Block<ButtonProps> {
  static  componentName = 'Button'
  constructor(props: ButtonProps) {
    super({
      type: props.type,
      title: props.title,
      events: {
        click: props.onClick
      }
    } as ButtonProps);
    
  }
  render(): string {
    //language=hbs
    return `<button 
        type="{{type}}"
        class="{{className}}"
        data-id="{{id}}"
        name="{{name}}"
    >
      {{title}}
    </button>`
  }
}
export { Button, ButtonProps }
