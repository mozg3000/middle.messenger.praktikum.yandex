import { Block, registerComponent } from '../../../core';
import { InfoItem } from './InfoItem';
registerComponent(InfoItem)

type Profile = {
  name: string,
  value: string,
  iname: string,
  type: string,
  ref: string
}

interface InfoProps {
  editItem: boolean,
  ref: string,
  handler: () => void,
  change: () => void,
  profile: Profile[]
}

const Info = class extends Block<InfoProps> {
  static componentName = 'Info'
  protected render(): string {
    //language=hbs
    return `
      <form name="profile" class="info__block flex d-column">
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
      </form>`
  }
}
export { Info, Profile }
