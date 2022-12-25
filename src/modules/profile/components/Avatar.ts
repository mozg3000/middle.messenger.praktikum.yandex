import { Block } from '../../../core';

interface AvatarProps {
  url: string,
  className: string
}

const Avatar = class extends Block {
  static componentName = 'Avatar'

  constructor(props: AvatarProps) {
    super(props);
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="avatar-block">
        <div class="ma {{className}}" style="background-image: url({{url}})">

        </div>
      </div>`
  }
}

export { Avatar }
