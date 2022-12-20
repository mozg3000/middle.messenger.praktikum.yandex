import { Block, registerComponent } from '../../../core';
import { Input } from '../../../components/controls';
registerComponent(Input)
const InfoItem = class extends Block {
  render(): string {
    //language=hbs
    return `
      <div class="info__item flex f-between">
        <div class="label"><p>{{data.name}}</p></div>
        <div class="description">
          {{#if edit}}
            {{{
              Input
                name=data.iname
                id=data.iname
                value=data.value
                className="profile__input" 
                type=data.type
            }}}
          {{else}}
            <p>{{data.value}}</p>
          {{/if}}
        </div>
      </div>`
  }
}
export { InfoItem }
//className="profile__input" type=data.type}}
