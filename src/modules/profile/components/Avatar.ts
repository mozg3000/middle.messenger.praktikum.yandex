import { Block } from '../../../core';

interface AvatarProps {
  url: string,
  className?: string
}

const Avatar = class extends Block<AvatarProps> {
  static componentName = 'Avatar'

  protected render(): string {
    //language=hbs
    return `
      <div class="avatar-block">
        <div class="ma {{className}}" style="background-image: url({{url}})">

        </div>
      </div>`
  }
}

export { Avatar, AvatarProps }
