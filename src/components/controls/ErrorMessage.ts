import { Block } from '../../core';

 interface MessageProps {
  error: boolean,
  message: string
}

class ErrorMessage extends Block<MessageProps> {
  static componentName = 'ErrorMessage'
  constructor(props: MessageProps) {
    super(props)
  }

  render() {
    //language=hbs
    return `
      <span class="danger">
        {{#if error}}
          {{message}}
        {{/if}}
      </span>`
  }
}
export { ErrorMessage, MessageProps }
