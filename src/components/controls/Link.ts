import {Block} from "../../core";

interface LinkProps {
  url: string,
  className?: string,
  target?: string,
  text: string,
  click?: (event: Event) => void, // eslint-disable-line no-unused-vars
  events?: { [key: string]: (event: Event) => void } // eslint-disable-line no-unused-vars
}

const Link = class extends Block<LinkProps> {
  static componentName = 'Link'
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: props.click as (event: Event) => void
      }
    });

  }
  protected render(): string {
    //language=hbs
    return `<a href="{{url}}" class="{{className}}" target="{{target}}">{{text}}</a>`
  }
}
export { Link, LinkProps }
