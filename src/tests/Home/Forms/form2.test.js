import * as Formik from 'formik';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form2 from '../../../Component/Forms/Form2';

const useFormikContextMock = jest.spyOn(Formik, 'useFormikContext');

beforeEach(() => {
  useFormikContextMock.mockReturnValue({
    getFieldMeta: {
      values: {
        firstName: '',
        lastName: '',
        address: '',
      },
    },
  });
});

describe('Form2', () => {
  it('rendered form2 component', async () => {
    render(<Form2 />);
    const user = userEvent.setup();
    const fNameField = screen.getByTestId('firstname');

    expect(fNameField)?.toBeInTheDocument();

    await user.type(fNameField, 'us');
    expect(fNameField)?.toHaveValue('us');
    expect(screen.getByTestId('firstname-error')).toBeVisible();
  });
});
