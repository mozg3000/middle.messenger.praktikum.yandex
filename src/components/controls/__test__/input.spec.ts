import {renderBlock} from '../../../tests/renderUtils';
import {getByRole} from '@testing-library/dom';
import {Input, InputProps} from '../Input';

function renderInput(
  change?: (event: Event) => void
) {
  const comps = new Array<any>(1)
  comps.push(Input)
  renderBlock<InputProps, any>(
    {
      Block: Input,
      props: {
        name: 'first_name',
        type: 'Submit',
        change
      }
    },
    comps
  )

  return getByRole(document.body, 'button')
}

describe('components/Input', () => {
  it('should render input', function () {
    const input = renderInput()

    expect(input).toBeInTheDocument()
  })

  it('should call change when user type', function () {
    const mock = jest.fn()

    const input = renderInput(mock)
    input.dispatchEvent(new Event('input'))

    expect(mock).toBeCalled()
  });
})
