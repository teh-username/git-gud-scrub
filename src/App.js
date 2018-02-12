import React from 'react';
import FileSystem from './containers/FileSystem';
import FileStatus from './containers/FileStatus';
import CommitGraph from './components/CommitGraph';
import Terminal from './components/Terminal';

const App = () => [
  <FileSystem key="fs" />,
  <CommitGraph key="cg" />,
  <Terminal key="tl" />,
  <FileStatus key="ft" />,
];

export default App;
