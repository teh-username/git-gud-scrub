import React from 'react';
import ReactDOM from 'react-dom';
import FileSystem from './FileSystem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FileSystem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
