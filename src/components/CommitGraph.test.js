import React from 'react';
import ReactDOM from 'react-dom';
import CommitGraph from './CommitGraph';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommitGraph />, div);
  ReactDOM.unmountComponentAtNode(div);
});
