import { Block } from '../../core'
interface ButtonProps {
  onClick: (event: Event) => void;  // eslint-disable-line no-unused-vars
  type: string,
  className: string,
  title: string,
  
}
const Button = class extends Block {
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
    return `<button type="{{type}}" class="{{className}}">{{title}}</button>`
  }
}
export { Button }
