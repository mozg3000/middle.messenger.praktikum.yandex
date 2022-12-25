import { Block, registerComponent } from '../../../core';
import { ChatListItem } from './ChatListItem';
import { chatList } from './initProps';

registerComponent(ChatListItem)

interface ChatListProps {
  selectedId: number
  selectChat: (event: Event) => void // eslint-disable-line no-unused-vars
}

const ChatList = class extends Block {
  static componentName = 'ChatList'
  constructor(props: ChatListProps) {
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

