import React from 'react';
import { render } from '@testing-library/react';
import Page from '../src/app/page';

describe('Page', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
