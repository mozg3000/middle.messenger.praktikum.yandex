import { Block, registerComponent } from '../../../core';
import { InfoItem } from './InfoItem';
registerComponent(InfoItem)
const Info = class extends Block {
  protected render(): string {
    //language=hbs
    return `
      <div class="info__block flex d-column">
        {{#each profile}}
          {{{
            InfoItem
              data=this
              edit=../editItem
          }}}
        {{/each}}
      </div>`
  }
}
export { Info }
