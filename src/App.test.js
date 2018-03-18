import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reducer from './redux/index';

it('renders as expected', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
