import { Block, registerComponent } from '../../../core';
import { Avatar } from '../../profile/components';

registerComponent(Avatar)

interface ChatItemProps{
  avatarUrl: string,
  chatId: number | string,
  active: boolean,
  nickname: string,
  lastMessage: string,
  timestamp: string,
  newMassageNumber: number | string,
  events?: { [key: string]: (event?: Event) => void } // eslint-disable-line no-unused-vars
  select?: (event: Event) => void // eslint-disable-line no-unused-vars
}

const ChatListItem = class extends Block<ChatItemProps> {
  static componentName = 'ChatListItem'
  constructor(props: ChatItemProps) {
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
      class="chat-list-item flex f-between {{#if active}}chat-list-item-active{{/if}}"
      data-id="{{chatId}}"
    >
      <div class="avatar-block">
        {{{
          Avatar
            url=avatarUrl
            className="avatar-img"
        }}}
      </div>
      <div class="message-block">
        <p>{{{nickname}}}</p>
        <p>{{{lastMessage}}}</p>
      </div>
      <div class="notification-block flex d-column f-between">
        <div>
          {{{
            Button
              className="btn btn-delete-chat"
              title="X"
              name="deleteChat"
          }}}
        </div>
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
