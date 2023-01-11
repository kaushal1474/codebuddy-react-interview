import * as Formik from 'formik';
import { prettyDOM, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Form1 from '../../../Component/Forms/Form1';

const useFormikContextMock = jest.spyOn(Formik, 'useFormikContext');

beforeEach(() => {
  useFormikContextMock.mockReturnValue({
    getFieldMeta: {
      values: {
        form1: {
          email: '',
          password: '',
        },
      },
    },
  });
});

describe('Form1', () => {
  it('rendered form1 component', async () => {
    render(<Form1 />);
    const user = userEvent.setup();
    const emailField = screen.getByTestId('email');
    const passField = screen.getByTestId('password');

    expect(emailField)?.toBeInTheDocument();
    expect(passField)?.toBeInTheDocument();

    await user.type(emailField, 'test@gmail.com');
    console.log(prettyDOM(emailField));
    expect(emailField)?.toHaveValue('test@gmail.com');
  });
});
