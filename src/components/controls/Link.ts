import {Block} from "../../core";

interface LinkProps {
  url: string,
  className: string,
  target: string,
  text: string,
  click: (event: Event) => void // eslint-disable-line no-unused-vars
}
const Link = class extends Block {
  static componentName = 'Link'
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: props.click
      }
    });

  }
  protected render(): string {
    //language=hbs
    return `<a href="{{url}}" class="{{className}}" target="{{target}}">{{text}}</a>`
  }
}
export { Link }
