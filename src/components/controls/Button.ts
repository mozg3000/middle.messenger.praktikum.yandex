import { Block } from '../../core'
interface ButtonProps {
  onClick: (event: Event) => void;  // eslint-disable-line no-unused-vars
  type: string,
  className: string,
  title: string,
  
}
const Button = class extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
    
  }

  //language=hbs
  render(): string {
    return `<button type="{{type}}" class="{{className}}">{{title}}</button>`
  }
}
export { Button }
