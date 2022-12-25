import { Block, registerComponent } from '../../../core';
import { InfoItem } from './InfoItem';
registerComponent(InfoItem)
const Info = class extends Block {
  protected render(): string {
    //language=hbs
    return `
      <div class="info__block flex d-column">
        ${this.props.profile.map(p => {
          return `
            {{{
              InfoItem
                value="${p.value}"
                name="${p.name}"
                iname="${p.iname}"
                type="${p.type}"
                inputRef="${p.ref}"
                ref="${p.ref}"
                edit=${this.props.editItem}
                handler=handler
                change=change
            }}}`
        }).join(' ')}
      </div>`
  }
}
export { Info }
