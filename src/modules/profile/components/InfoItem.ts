import { Block, registerComponent } from '../../../core';
import { Input } from '../../../components/controls';
registerComponent(Input)
const InfoItem = class extends Block {
  render(): string {
    //language=hbs
    return `
      <div class="info__item flex f-between">
        <div class="label"><p>{{name}}</p></div>
        <div class="description">
          {{#if edit}}
            {{{
            InputGroup
              title=""
              id=passwordInputId
              name=iname
              type=type
              value=value
              id=iname
              focus=handler
              blur=handler
              change=change
              ref=inputRef
            }}}
          {{else}}
            <p>{{value}}</p>
          {{/if}}
        </div>
      </div>`
  }
}
export { InfoItem }

