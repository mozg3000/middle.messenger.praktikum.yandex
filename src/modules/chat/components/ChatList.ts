import { Block, registerComponent } from '../../../core';
import { ChatListItem } from './ChatListItem';
import { withStore } from '../../../lib/infrastructure';

registerComponent(ChatListItem)

type ChatItem = {
  id: number,
  title: string,
  lastMessage: Message | null,
  unread_count: number,
  avatar: string | null
  "created_by": number,
}

type Message = {
  "user": {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string
  },
  time: string,
  content: string
}

interface ChatListProps {
  selectedId: number
  selectChat: (event: Event) => void, // eslint-disable-line no-unused-vars
  chat?: () => ChatItem[],
  avatarUrl: (chat: ChatItem) => string | URL // eslint-disable-line no-unused-vars
}

const ChatList = class extends Block<ChatListProps> {
  static componentName = 'ChatList'
  constructor(props: ChatListProps) {
    super({
      selectedId: props.selectedId,
      selectChat: props.selectChat,
      chats: () => props.store.getState().chats,
      avatarUrl: (c) => c.avatar
        ? `${process.env.API_ENDPOINT}/resources/${encodeURI(c.avatar)}`  // eslint-disable-line no-undef
        : new URL('../../../assets/images/profile/avatar.svg', import.meta.url)
    } as ChatListProps);
  }
  protected render(): string {
    //language=hbs
    return `
      <article class="chat-list-block">
        ${this.props.chats().map((c) => {
          const lastMessage = c.lastMessage ? '' : 'No message yet'
            return `
          {{{
            ChatListItem
              nickname="${c.title}"
              lastMessage="${lastMessage}"
              newMessageNumber="${c.unread_count}"
              active=${(c.id == this.props.selectedId)}
              chatId="${c.id}"
              select=selectChat
              avatarUrl="${this.props.avatarUrl(c)}"
          }}}`
        }).join(' ')}
      </article>`
  }
}
export { ChatList }
export default withStore(ChatList)
