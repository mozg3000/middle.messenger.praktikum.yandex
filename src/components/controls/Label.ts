import { Block } from '../../core';

const Label = class extends Block {
  protected render(): string {
    return `<label for="{{id}}" class="{{className}}">{{title}}</label>`
  }
}

export { Label }
