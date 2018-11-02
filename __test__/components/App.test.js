import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

/* eslint no-undef: "off" */
describe('App', () => {
  const props = {
    title: 'ReactEasyBoilerplate',
  };
  const wrapper = shallow(<App title={props.title} />);
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the h1 correctly', () => {
    expect(wrapper.find('h1').text()).toBe('ReactEasyBoilerplate');
  });
});
