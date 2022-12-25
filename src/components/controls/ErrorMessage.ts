import { Block } from '../../core';

interface ErrorMessageProps {
  error: boolean,
  message: string
}
const ErrorMessage = class extends Block {
  static componentName = 'ErrorMessage'
  constructor(props: ErrorMessageProps) {
    super(props);
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
export { ErrorMessage }

