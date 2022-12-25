import { Block } from '../../../core';

const Avatar = class extends Block {
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
// background-image: url("../assets/images/profile/avatar.svg");
