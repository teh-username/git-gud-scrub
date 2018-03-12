import { addLogInfo } from './terminal';
import { commandRebuilder } from '../../utils/commandProcessor';

export const GIT_ADD = 'modules/gitEmulator/GIT_ADD';

export const gitAdd = fileName => ({
  type: GIT_ADD,
  fileName
});

export const executeCommand = input => dispatch => {
  dispatch(addLogInfo(commandRebuilder(input)));
};
