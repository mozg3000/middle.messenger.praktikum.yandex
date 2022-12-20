import { Block, registerComponent } from '../../core';
import { Avatar } from '../../modules/profile/components';
import { Info } from '../../modules/profile/components/Info';
import { Action } from '../../modules/profile/components';
import { Profile } from './initProps';

registerComponent(Avatar)
registerComponent(Info)
registerComponent(Action)
const ProfilePage = class extends Block {
  constructor() {
    console.log('import.meta.url=', import.meta.url)
    super({
      avatarUrl: new URL('../../assets/images/profile/avatar.svg', import.meta.url),
      data: Profile.data,
      edit: false,
      handleEditClick: (event: Event) => {
        this.props.edit = true
        event.preventDefault()
      },
      handleSaveEditClick: (event: Event) => {
        event.preventDefault()
        this.props.edit = false
      }
    });
  }
  protected render(): string {
    //language=hbs
    return `
    <div>
      <div class="back-block absolute">
        <a href="/">
          <svg
            class="back-block__arrow"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-5v4l-5-5 5-5v4h5v2z"/>
          </svg>
        </a>
      </div>
      <div class="container">
        {{{ 
          Avatar
            url=avatarUrl
        }}}
        <div class="profile-name">
          Иван
        </div>
        <div class="info">
          {{{
            Info
              profile=data
              editItem=edit
          }}}
          {{#if edit}}
            {{{
              Button
                type=submit
                className="btn btn__primary w-100"
                title="Сохранить"
                onClick=handleSaveEditClick
            }}}
          {{else}}
            {{{
              Action
                handleEditClick=handleEditClick
            }}}
          {{/if}}
        </div>
      </div>
    </div>`
  }
}
export { ProfilePage }
