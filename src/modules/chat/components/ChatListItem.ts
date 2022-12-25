import { Block, registerComponent } from '../../../core';
import { Avatar } from '../../profile/components';

registerComponent(Avatar)

const ChatListItem = class extends Block {
  static componentName = 'ChatListItem'
  constructor(props) {
    super({
      ...props,
      events: {
        click: props.select
      }
    });
  }
  protected render(): string {
    //language=hbs
    return `
    <section 
      class="chat-list_item flex f-between {{#if active}}chat-list_item__active{{/if}}"
      data-id="{{chatId}}"
    >
      <div class="avatar_block">
        {{{
          Avatar
            url=avatarUrl
            className="avatar__img"
        }}}
      </div>
      <div class="message_block">
        <p>{{{nickname}}}</p>
        <p>{{{lastMessage}}}</p>
      </div>
      <div class="notification_block flex d-column f-between">
        <div>
          <p>{{{timestamp}}}</p>
        </div>
        <div>
          <p>{{{newMessageNumber}}}</p>
        </div>
      </div>
    </section>`
  }
}
export { ChatListItem }
