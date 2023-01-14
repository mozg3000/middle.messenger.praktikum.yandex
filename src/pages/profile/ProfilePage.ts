import { Block, registerComponent } from '../../core';
import { Avatar } from '../../modules/profile/components';
import {Info, Profile } from '../../modules/profile/components/Info';
import { Action } from '../../modules/profile/components';
import { ProfileData } from './initProps';
import { Validator } from '../../lib/validators';
import { ruleSet } from '../../modules/auth/register/RegisterRuleSet';

registerComponent(Avatar)
registerComponent(Info)
registerComponent(Action)

interface ProfilePageProps {
  avatarUrl: URL,
  data: Profile[],
  edit: boolean,
  handleEditClick: (event: Event) => void, // eslint-disable-line no-unused-vars
  handleSaveEditClick: (event: Event) => void, // eslint-disable-line no-unused-vars
  handler: () => void,
  change: () => void
}

const ProfilePage = class extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage'
  private _validator: Validator;
  constructor() {
    super({
      avatarUrl: new URL('../../assets/images/profile/avatar.svg', import.meta.url),
      data: ProfileData.data,
      edit: false,
      handleEditClick: (event: Event) => {
        this.props.edit = true
        event.preventDefault()
      },
      handleSaveEditClick: (event: Event) => {
        event.preventDefault()
        if (this.validateInputs()) {
          const profileFormData: FormData = new FormData(document.forms.profile)
          console.log(Object.fromEntries(profileFormData))
          this.props.edit = false
        }
      },
      handler: () => this.validateInputs(),
      change: () => {
        const refs: { [p: string ]: Block } = this.refs.infoBlock.refs
        for (const ref: string in refs) {
          refs[ref].refs[ref].refs.errorBlock.props.message = ''
        }
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
        <a href="/">
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
        <div class="info">
          {{{
            Info
              profile=data
              editItem=edit
              handler=handler
              change=change
              ref="infoBlock"
          }}}
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
            }}}
          {{/if}}
        </div>
      </div>
    </main>`
  }
}
export { ProfilePage }
