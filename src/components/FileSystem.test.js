import React from 'react';
import ReactDOM from 'react-dom';
import FileSystem from './FileSystem';
import { initialState } from '../reducers/fileSystem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FileSystem {...initialState} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
