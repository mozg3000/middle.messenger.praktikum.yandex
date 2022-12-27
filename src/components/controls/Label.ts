import { Block } from '../../core';

interface LabelProps {
  id?: string,
  className?: string,
  title?: string
}

const Label = class extends Block<LabelProps> {
  static componentName = 'Label'
  protected render(): string {
    return `<label for="{{id}}" class="{{className}}">{{title}}</label>`
  }
}

export { Label, LabelProps }
