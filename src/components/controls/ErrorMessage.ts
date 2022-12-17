import { Block } from '../../core';

const ErrorMessage = class extends Block {
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

