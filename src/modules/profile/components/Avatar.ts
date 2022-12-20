import { Block } from '../../../core';

const Avatar = class extends Block {
  protected render(): string {
    //language=hbs
    return `
      <div class="avatar-block mt-60">
        <div class="avatar-block__image ma" style="background-image: url({{url}})">

        </div>
      </div>`
  }
}

export { Avatar }
// background-image: url("../assets/images/profile/avatar.svg");
