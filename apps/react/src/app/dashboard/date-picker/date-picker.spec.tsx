import React from 'react';
import { render } from '@testing-library/react';

import DatePicker from './date-picker';

describe(' DatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DatePicker label="random" value="2020-03-03" onChange={() => {}} />
    );
    expect(baseElement).toBeTruthy();
  });
});
