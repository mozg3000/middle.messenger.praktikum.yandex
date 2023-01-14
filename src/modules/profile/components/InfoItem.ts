import { Block, registerComponent } from '../../../core';
import { Input } from '../../../components/controls';
registerComponent(Input)

interface InfoItemProps {
  iname: string,
  name?: string,
  type: string,
  value: string,
  handler: () => void,
  change: () => void,
  inputRef: string
}

const InfoItem = class extends Block<InfoItemProps> {
  static componentName = 'InfoItem'
  render(): string {
    //language=hbs
    return `
      <div class="info-item flex f-between">
        <div class="label"><p>{{name}}</p></div>
        <div class="description">
          {{#if edit}}
            {{{
            InputGroup
              title=""
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

