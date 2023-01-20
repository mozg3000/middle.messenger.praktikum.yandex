import { Block, registerComponent } from '../../core';
import ChatList from '../../modules/chat/components/ChatList'; // eslint-disable-line
import { Link, Input, Button } from '../../components/controls';
import { create, deleteChatter, getChats, getUsers } from '../../services/chat/chat';
import { withStore } from '../../lib/infrastructure';
import { addChatter } from '../../services/chat/chat'

registerComponent(ChatList)
registerComponent(Link)
registerComponent(Input)
registerComponent(Button)

interface ChatProps {
  selected: boolean,
  selectedId: number | string,
  users: () => Array<User> // eslint-disable-line no-undef
  handleSelectChat: (event: Event) => void // eslint-disable-line no-unused-vars
  handleCreateClick: (event: Event) => void // eslint-disable-line no-unused-vars
  handleAddChatterClick: (event: Event) => void // eslint-disable-line no-unused-vars
  handleDeleteUser: (event: Event) => void // eslint-disable-line no-unused-vars
}

const Chat = class extends Block<ChatProps> {

  static componentName = 'Chat'

  constructor(props) { // eslint-disable-line no-unused-vars
    super({
      ...props,
      selected: false,
      selectedId: -1,
      users: () => props.store.getState().users,
      handleSelectChat: (event: Event) => {
        this.props.selectedId = event.currentTarget.dataset.id
        this.props.selected = true
        this.props.store.dispatch(getUsers, this.props.selectedId)
      },
      handleCreateClick: (event: Event) => {
        event.preventDefault()
        const formData = new FormData(document.forms.createChat)
        this.props.store.dispatch(create, Object.fromEntries(formData))
      },
      handleAddChatterClick: (event: Event) => {
        event.preventDefault()
        this.props.store.dispatch(addChatter, {
          users: [document.forms.addChatter.elements[0].value],
          chatId: this.props.selectedId
        })
      },
      handleDeleteUser: (event: Event) => {
        this.props.store.dispatch(deleteChatter, {
          chatId: this.props.selectedId,
          users: [event.target.dataset.id]
        })
      }
    })
  }

  componentDidMount(props: ChatProps) {
    super.componentDidMount(props);
    this.props.store.dispatch(getChats)
  }

  protected render(): string {
    //language=hbs
    return `
    <div class="flex d-column">
      <main class="chat ma flex">
        <div class="chat-list">
          <div class="profile-block">
            {{{
              Link
                url="/profile"
                text="Профиль"
                className="profile-link"
            }}}
          </div>
          <div class="search-block">
            {{{
              Input
                type="text"
                id="search_input"
                placeholder="Поиск"
                className="search-block-input"
                name="search"
            }}}
          </div>
          <div class="chatlist_block">
            {{{
              ChatList
                selectedId=selectedId
                selectChat=handleSelectChat
            }}}
          </div>
        </div>
        <div class="messages-box flex d-column f-center">
          {{#if selected}}
            <div class="messages-list">
              Тут будут сообщения
            </div>
            <div class="messages-box-send flex f-between">
              <div class="attach-btn">
                <svg width="30" height="30" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <clipPath id="clip-clip">
                      <rect width="96" height="96"/>
                    </clipPath>
                  </defs>
                  <g id="clip" clip-path="url(#clip-clip)">
                    <g id="pills" transform="translate(-232 -116)">
                      <g id="Group_151" data-name="Group 151">
                        <line id="Line_15" data-name="Line 15" y2="49" transform="translate(256 135)" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        <line id="Line_16" data-name="Line 16" y2="42" transform="translate(272 135)" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        <line id="Line_17" data-name="Line 17" y2="42" transform="translate(288 135)" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        <line id="Line_18" data-name="Line 18" y2="49" transform="translate(304 135)" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        <path id="Path_182" data-name="Path 182" d="M288,177a8,8,0,0,1-16,0" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        <path id="Path_183" data-name="Path 183" d="M256,134.74a16,16,0,0,1,32,0" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        <path id="Path_184" data-name="Path 184" d="M304,184.39a24,24,0,0,1-48,0" fill="none" stroke="#58595b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div class="sent-input">
              {{{
                Input
                  type="text"
                  id="send_input"
                  placeholder="Сообщение"
                  className="send-block-input"
                  name="message"
              }}}
              </div>
              <div class="send-btn">
                <svg fill="#000000" width="20" height="20" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 41.6874 27.9766 C 41.6874 28.5859 41.4530 29.0547 40.9374 29.5703 L 31.9609 38.5234 C 31.6093 38.8516 31.1405 39.0859 30.5780 39.0859 C 29.4765 39.0859 28.6093 38.2422 28.6093 37.1406 C 28.6093 36.5547 28.8436 36.0625 29.2187 35.7109 L 32.5234 32.4766 L 35.7109 29.7812 L 30.0624 29.9922 L 16.3280 29.9922 C 15.1327 29.9922 14.3358 29.1484 14.3358 27.9766 C 14.3358 26.8047 15.1327 25.9609 16.3280 25.9609 L 30.0624 25.9609 L 35.6874 26.1953 L 32.5234 23.5234 L 29.2187 20.2422 C 28.8671 19.9141 28.6093 19.3984 28.6093 18.8359 C 28.6093 17.7344 29.4765 16.8906 30.5780 16.8906 C 31.1405 16.8906 31.6093 17.0781 31.9609 17.4297 L 40.9374 26.4063 C 41.4765 26.9453 41.6874 27.4141 41.6874 27.9766 Z"/>
                </svg>
              </div>
            </div>
          {{else}}
            <div class="t-center">
              <p class="no-chat-text">Выберите чат чтобы отправить сообщение</p>
            </div>
          {{/if}}
        </div>
      </main>
      <div class="flex">
        <div class="create-chat">
          <form action="/" name="createChat" class="flex d-column">
            <input type="text" name="title" id="title_input">
            {{{
              Button
                type="submit"
                className="btn btn-primary"
                title="Create new chat"
                onClick=handleCreateClick
            }}}
          </form>
        </div>
        <div class="add-user">
          {{#if selected }}
          <form action="/" name="addChatter" class="flex d-column">
            <input type="text" name="title" id="title_input">
            {{{
              Button
                type="submit"
                className="btn btn-primary"
                title="Add new chatter"
                onClick=handleAddChatterClick
            }}}
          </form>
          {{/if}}
        </div>
      </div>
      {{#if selected }}
      <div class="flex">
        <h6>Список пользователей чата</h6>
        <ul>
          ${this.props.users().map(u => `
            <li>
              ${u.login} (id:${u.id}) 
              {{{
                Button
                  id="${u.id}"
                  onClick=handleDeleteUser
                  title="X"
              }}}
            </li>`)}
        </ul>
      </div>
      {{/if}}
    </div>`
  }
}
export { Chat }

export default withStore(Chat)
