import React from 'react';
import { render } from '@testing-library/react';

import DateRoute from './date-route';

describe(' DateRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateRoute />);
    expect(baseElement).toBeTruthy();
  });
});
