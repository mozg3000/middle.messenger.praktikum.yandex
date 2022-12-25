import { Block, registerComponent } from '../../../core';
import { ChatListItem } from './ChatListItem';
import { chatList } from './initProps';

registerComponent(ChatListItem)
const ChatList = class extends Block {
  constructor(props) {
    super({
      ...props,
      chat: chatList.data,
      messages: chatList.messages
    });
  }
  protected render(): string {
    //language=hbs
    return `
      <article class="chat-list_block">
        ${this.props.chat.map(c => {
          return `
            {{{
              ChatListItem
                nickname="${c.nickname}"
                lastMessage="${c.lastMessage}"
                timestamp="${c.timestamp}"
                newMessageNumber="${c.newMessageNumber}"
                active=${(c.id == this.props.selectedId)}
                chatId="${c.id}"
                select=selectChat
            }}}`
        }).join(' ')}
      </article>`
  }
}
export { ChatList }

