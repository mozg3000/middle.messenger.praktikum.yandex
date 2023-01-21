import { Block, registerComponent } from '../../core';
import { Avatar } from '../../modules/profile/components';
import {Info, Profile } from '../../modules/profile/components/Info';
import { Action } from '../../modules/profile/components';
import { ProfileData } from './initProps';
import { Validator } from '../../lib/validators';
import { ruleSet } from '../../modules/auth/register/RegisterRuleSet';
import { logout } from '../../services/user/auth';
import { changeAvatar, updateProfile } from '../../services/user/profile';
import { changeUserPassword } from '../../services/user/user';
import { withStore } from '../../lib/infrastructure';

registerComponent(Avatar)
registerComponent(Info)
registerComponent(Action)

interface ProfilePageProps {
  avatarUrl: () => URL | string,
  data: () => Profile[], // eslint-disable-line
  edit: boolean,
  changePass: boolean,
  handleEditClick: (event: Event) => void, // eslint-disable-line no-unused-vars
  handleSaveEditClick: (event: Event) => void, // eslint-disable-line no-unused-vars
  handler: () => void,
  change: () => void,
  handleLogout: (event: Event) => void, // eslint-disable-line no-unused-vars
  handleChangePassword: (event: Event) => void // eslint-disable-line no-unused-vars
  handleChangePass: (event: Event) => void // eslint-disable-line no-unused-vars
  handleChangeAvatar: (event: Event) => void // eslint-disable-line no-unused-vars
}

const ProfilePage = class extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage'
  private _validator: Validator;
  constructor(props) {
    super({ // eslint-disable-next-line no-undef
      avatarUrl: () => props.store.getState().user && props.store.getState().user.avatar
        ? `${process.env.API_ENDPOINT}/resources/${encodeURI(props.store.getState().user.avatar)}`  // eslint-disable-line no-undef
        : new URL('../../assets/images/profile/avatar.svg', import.meta.url),
      data: () => props.store.getState().user
        ? ((ProfileData.data as Array<Profile>).map(infoItem => {
          return ({
            ...infoItem,
            value: props.store.getState().user[infoItem.iname]
          })
        }))
        : ProfileData.data,
      edit: false,
      changePass: false,
      handleEditClick: (event: Event) => {
        this.props.edit = true
        event.preventDefault()
      },
      handleSaveEditClick: (event: Event) => {
        event.preventDefault()
        if (this.validateInputs()) {
          const profileFormData: FormData = new FormData(document.forms.profile)
          props.store.dispatch(updateProfile, Object.fromEntries(profileFormData))
          this.props.edit = false
        }
      },
      handler: () => this.validateInputs(),
      change: () => {
        const refs: { [p: string ]: Block } = this.refs.infoBlock.refs
        for (const ref: string in refs) {
          refs[ref].refs[ref].refs.errorBlock.props.message = ''
        }
      },
      handleLogout: (event: Event) => {
        event.preventDefault()
        props.store.dispatch(logout)
      },
      handleChangePassword: (event: Event) => {
        this.props.changePass = true
        event.preventDefault()
      },
      handleChangePass: (event: Event) => {
        event.preventDefault()
        const changeUserPassFormData: FormData = new FormData(document.forms.changePass)
        props.store.dispatch(changeUserPassword, Object.fromEntries(changeUserPassFormData))
        this.props.changePass = false
      },
      handleChangeAvatar: (event: Event) => {
        event.preventDefault()
        const changeAvatarFormData: FormData = new FormData()
        changeAvatarFormData.append('avatar', document.forms.changeAvatar.elements[0].files[0])
        props.store.dispatch(changeAvatar, changeAvatarFormData)
      }
    })
    this._validator = new Validator(ruleSet)
  }
  validateInputs():boolean {
    const refs: { [p: string ]: Block } = this.refs.infoBlock.refs
    let error: boolean = false
    for (const ref: string in refs) {
      const inputComponent: Nullable<Block> = refs[ref].refs[ref].refs.input // eslint-disable-line no-undef
      if (inputComponent) {
        const inputElement: Nullable<HTMLInputElement> = inputComponent._element as HTMLInputElement // eslint-disable-line no-undef
        const value: string = inputElement.value
        const name: string = inputElement.name
        error = !this._validator.validate(name, value)
        if (error) {
          this.setError(ref, name)
        }
      }
    }
    return !error
  }
  setError(refName: string, type: string):void {
    this.refs.infoBlock.refs[refName].refs[refName].refs.errorBlock.props.error = true // eslint-disable-line
    this.refs.infoBlock.refs[refName].refs[refName].refs.errorBlock.props.message = this._validator.getFirstError(type)
  }

  protected render(): string {
    //language=hbs
    return `
    <main>
      <div class="back-block absolute">
        <a href="javascript:window.router.go('/chats')">
          <svg
            class="back-block-arrow"
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
            className="avatar-block-image"
        }}}
        <div class="profile-name">
          Иван
        </div>
        <div class="profile-name">
          <form action="/" name="changeAvatar">
            <input id="avatar" type="file" name="avatar" accept="image/*">
            {{{
              Button
                type="submit"
                className="btn btn-primary save-avatar-btn"
                title="Сохранить"
                onClick=handleChangeAvatar
            }}}
          </form>
        </div>
        <div class="info">
          {{{
            Info
              profile=data
              editItem=edit
              handler=handler
              change=change
              ref="infoBlock"
          }}}
          {{#if changePass}}
            <form action="/" name="changePass" class="flex d-column">
                <label for="oldPassId">старый пароль</label>
              <input type="password" name="oldPassword" id="oldPassId">
                <label for="newPassId">новый пароль</label>
                <input type="password" name="newPassword" id="newPassId">
                {{{
                Button
                  type="submit"
                  className="btn btn-primary w-100"
                  title="Сохранить"
                  onClick=handleChangePass
                }}}
            </form>
          {{/if}}
          {{#if edit}}
            {{{
              Button
                type="submit"
                className="btn btn-primary w-100"
                title="Сохранить"
                onClick=handleSaveEditClick
            }}}
          {{else}}
            {{{
              Action
                handleEditClick=handleEditClick
                handleLogout=handleLogout
                handleChangePassword=handleChangePassword
            }}}
          {{/if}}
        </div>
      </div>
    </main>`
  }
}
export { ProfilePage }
export default withStore(ProfilePage)
