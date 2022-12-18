import { Block, registerComponent } from '../../core';
import { Input } from './Input';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

registerComponent(Input);
registerComponent(Label);
registerComponent(ErrorMessage);
const InputGroup = class extends Block {
  render() {
    // language=hbs
    return `<div class="form-group flex d-column mt-30">
      {{{
        Label
          title=title
          id=id
      }}}
      {{{
        Input
          name=name
          type=type
          id=id
          value=value
          placeholder=placeholder
          className=className
          focus=focus
          blur=blur
          change=change
          ref='input'
      }}}
      {{{
        ErrorMessage
          error=error
          message=message
          ref='errorBlock'
      }}}
    </div>`
  }
}
export { InputGroup }
