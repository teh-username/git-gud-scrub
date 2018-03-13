import { addLogInfo, addLogError } from './terminal';
import { commandRebuilder } from '../../utils/commandProcessor';
import { getFiles } from './fileSystem';

export const GIT_ADD = 'modules/gitEmulator/GIT_ADD';

export const gitAdd = fileName => ({
  type: GIT_ADD,
  fileName,
});

const emulateAdd = ({ command, argument, flags }) => (dispatch, getState) => {
  const files = getFiles(getState());
  if (files.includes(argument)) {
    return dispatch(gitAdd(argument));
  }
  return dispatch(
    addLogError(`fatal: pathspec '${argument}' did not match any files`)
  );
};

const commandActionLookup = {
  add: emulateAdd,
};

export const executeCommand = input => dispatch => {
  dispatch(addLogInfo(commandRebuilder(input)));
  const availableCommands = Object.keys(commandActionLookup);

  if (input.executable !== 'git') {
    return dispatch(addLogError(`command not found: ${input.executable}`));
  }

  if (availableCommands.includes(input.command)) {
    return dispatch(commandActionLookup[input.command](input));
  }

  return dispatch(addLogError(`git: '${input.command}' is not a git command.`));
};
