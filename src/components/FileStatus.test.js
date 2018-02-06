import React from 'react';
import ReactDOM from 'react-dom';
import FileStatus from './FileStatus';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FileStatus />, div);
  ReactDOM.unmountComponentAtNode(div);
});
