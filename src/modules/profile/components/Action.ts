import { Block, registerComponent } from '../../../core';
import { Link } from '../../../components/controls';

registerComponent(Link)

interface ActionProps {
  handleEditClick: (event: Event) => void // eslint-disable-line no-unused-vars
  handleLogout: (event: Event) => void // eslint-disable-line no-unused-vars
  handleChangePassword: (event: Event) => void // eslint-disable-line no-unused-vars
}

const Action = class extends Block<ActionProps> {
  static componentName = 'Action'

  constructor(props: ActionProps) {
    super(props);
  }
  protected render(): string {
    //language=hbs
    return `
      <div class="info-bottom">
        <div class="info-item flex f-between">
          {{{
            Link
              url='javascript::void(0)' 
              text='Изменить данные'
              click=handleEditClick
          }}}
        </div>
        <div class="info-item flex f-between">
          {{{
            Link 
              url='/' 
              text='Изменить пароль'
              click=handleChangePassword
          }}}
        </div>
          {{{
            Link
              url='javascript::void(0)' 
              text='Выйти' 
              click=handleLogout
          }}}
      </div>`
  }
}
export { Action }
