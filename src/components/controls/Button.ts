import { Block } from '../../core'

interface ButtonProps {
  onClick?: (event: Event) => void; // eslint-disable-line no-unused-vars
  type: string,
  className?: string,
  title: string,
  events?: { [key: string]: (event?: Event) => void } // eslint-disable-line no-unused-vars
}

const Button = class extends Block<ButtonProps> {
  static  componentName = 'Button'
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
    
  }
  render(): string {
    //language=hbs
    return `<button 
        type="{{type}}"
        class="{{className}}"
        data-id="{{id}}"
    >
      {{title}}
    </button>`
  }
}
export { Button, ButtonProps }
