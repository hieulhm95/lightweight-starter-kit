import React from 'react';
import { render /* screen */ } from '@testing-library/react';
import BoxLoading from './BoxLoading';

describe('BoxLoading component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<BoxLoading id="abc" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render with inline styles', () => {
    const wrapper = render(<BoxLoading id="abc" style={{ width: '100%', height: '300px' }} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
