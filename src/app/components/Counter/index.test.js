import React from 'react';
import Counter from './index';

describe('<Counter>', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Counter resetLabel="reset" />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
