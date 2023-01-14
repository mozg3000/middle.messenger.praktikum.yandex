import { Block } from '../../core';

interface ErrorMessageProps {
  error: boolean,
  message: string
}

const ErrorMessage = class extends Block<ErrorMessageProps> {
  static componentName = 'ErrorMessage'

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
export { ErrorMessage, ErrorMessageProps }
