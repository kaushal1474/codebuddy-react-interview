import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));

// useStateMock.mockImplementation(initState => [initState, jest.fn()]);

describe('Home', () => {
  const setState = jest.fn();
  // eslint-disable-next-line
  const useStateMock = (initState) => [initState, setState];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('rendered Home component', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('heading')).toContainHTML(
      '<h1 data-testid="heading">Multi-step form</h1>',
    );
  });
});
