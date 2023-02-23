import { Block } from '../../../core';
import {isFunction} from "../../../lib/utiles/utils";

interface AvatarProps {
  url: string,
  className?: string
}

const Avatar = class extends Block<AvatarProps> {
  static componentName = 'Avatar'

  constructor(props: AvatarProps) {
    super(props);
  }

  protected render(): string {
    const url = isFunction(this.props.url) ? this.props.url() : this.props.url
    //language=hbs
    return `
      <div class="avatar-block">
          <div class="ma {{className}}" style="background-image: url(${url})">
        </div>
      </div>`
  }
}

export { Avatar, AvatarProps }
