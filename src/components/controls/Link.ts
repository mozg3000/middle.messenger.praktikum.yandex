import {Block} from "../../core";

const Link = class extends Block {
  constructor(props) {
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
