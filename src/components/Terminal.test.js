import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from './Terminal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Terminal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
