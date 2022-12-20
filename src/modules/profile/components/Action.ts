import { Block, registerComponent } from '../../../core';
import { Link } from '../../../components/controls';

registerComponent(Link)
const Action = class extends Block {
  protected render(): string {
    //language=hbs
    return `
      <div class="info__bottom">
        <div class="info__item flex f-between">
          {{{
            Link
              url='javascript::void(0)' 
              text='Изменить данные'
              click=handleEditClick
          }}}
        </div>
        <div class="info__item flex f-between">
          {{{Link 
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
// {{> 'components/controls/ms_link' url='javascript::void(0)' text='Изменить данные' }}
// {{> 'components/controls/ms_link' url='javascript::void(0)' text='Изменить пароль' }}
// {{> 'components/controls/ms_link' url='/' text='Выйти' }}
