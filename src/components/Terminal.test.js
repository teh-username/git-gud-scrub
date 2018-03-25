import React from 'react';
import Terminal from './Terminal';
import { initialState } from '../redux/modules/terminal';

describe('Terminal Component', () => {
  const sampleEntries = [
    {
      text: 'Darth Malak',
      logLevel: 'info',
    },
    {
      text: 'Darth Revan',
      logLevel: 'info',
    },
    {
      text: 'Darth Vader',
      logLevel: 'error',
    },
    {
      text: 'Darth Sidious',
      logLevel: 'info',
    },
  ];

  it('renders the console predictably', () => {
    const wrapper = shallow(<Terminal {...initialState} />);
    expect(wrapper.find('div.entries').children()).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders entries correctly', () => {
    const wrapper = shallow(<Terminal entries={sampleEntries} />);
    const entries = wrapper.find('div.entries').children();
    expect(entries.get(0).props).toEqual({
      children: 'Darth Malak',
      className: 'info',
    });
    expect(entries.get(1).props).toEqual({
      children: 'Darth Revan',
      className: 'info',
    });
    expect(entries.get(2).props).toEqual({
      children: 'Darth Vader',
      className: 'error',
    });
    expect(entries.get(3).props).toEqual({
      children: 'Darth Sidious',
      className: 'info',
    });
    expect(wrapper).toMatchSnapshot();
  });
});
