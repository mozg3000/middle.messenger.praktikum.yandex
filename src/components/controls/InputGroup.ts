import { Block, registerComponent } from '../../core';
import { Input, InputProps } from './Input';
import { Label, LabelProps } from './Label';
import { ErrorMessage, MessageProps } from './ErrorMessage';

registerComponent(Input);
registerComponent(Label);
registerComponent(ErrorMessage);

interface InputGroupProps extends InputProps, LabelProps, MessageProps {}
class InputGroup extends Block<InputGroupProps> {
  static componentName = 'InputGroup'
  constructor(props: InputGroupProps) {
    super(props)
  }
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
export { InputGroup, InputGroupProps }
