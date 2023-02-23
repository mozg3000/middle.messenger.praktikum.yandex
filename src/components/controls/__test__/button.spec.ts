import { getByRole } from '@testing-library/dom';
import { renderBlock } from '../../../tests/renderUtils';
import { Button, ButtonProps } from '../Button';

function renderButton(onClick?: (event: Event) => void) {
  const comps = new Array<any>(1)
  comps.push(Button)
  renderBlock<ButtonProps, any>(
    {
      Block: Button,
      props: {
        title: '123',
        type: 'Submit',
        onClick
      }
    },
    comps
  )

  return getByRole(document.body, 'button')
}

describe('components/Button', () => {

  it('should render button', () => {
    const button = renderButton()

    expect(button).toBeInTheDocument()
  })

  it('should call onClick when user press button', () => {

    const mock = jest.fn()

    const button = renderButton(mock)

    button.click()

    expect(mock).toBeCalled();
  })
})
