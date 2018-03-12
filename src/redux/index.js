import { combineReducers } from 'redux';
import fileSystem from './modules/fileSystem';
import terminal from './modules/terminal';

export default combineReducers({
  fileSystem,
  terminal
});
