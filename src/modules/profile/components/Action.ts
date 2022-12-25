import { Block, registerComponent } from '../../../core';
import { Link } from '../../../components/controls';

registerComponent(Link)
const Action = class extends Block {
  static componentName = 'Action'
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
              url='javascript::void(0)' 
              text='Изменить пароль'
          }}}
        </div>
          {{{
            Link
              url='/' 
              text='Выйти' 
          }}}
      </div>`
  }
}
export { Action }
