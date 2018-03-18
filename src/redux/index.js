import { combineReducers } from 'redux';
import fileSystem from './modules/fileSystem';
import terminal from './modules/terminal';
import commitGraph from './modules/commitGraph';

export default combineReducers({
  fileSystem,
  terminal,
  commitGraph,
});
