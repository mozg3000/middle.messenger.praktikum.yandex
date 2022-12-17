import {Block} from "../../core";

const Link = class extends Block {
  protected render(): string {
    //language=hbs
    return `<a href="{{url}}" class="{{className}}" target="{{target}}">{{text}}</a>`
  }
}
export { Link }
