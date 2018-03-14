import { addLogInfo, addLogError } from './terminal';
import { getFiles, getStagedFiles } from './fileSystem';
import { areEqual } from '../../utils/arrayOperators';
import { commandRebuilder } from '../../utils/commandProcessor';

export const GIT_ADD = 'modules/gitEmulator/GIT_ADD';
export const GIT_COMMIT = 'modules/gitEmulator/GIT_COMMIT';
export const gitAdd = fileName => ({
  type: GIT_ADD,
  fileName,
});

export const gitCommit = message => ({
  type: GIT_COMMIT,
  message,
});

export const emulateAdd = ({ command, argument, flags }) => (
  dispatch,
  getState
) => {
  // TODO: Adding a file that isn't modified/untracked?
  const files = getFiles(getState());
  if (files.includes(argument)) {
    return dispatch(gitAdd(argument));
  }
  return dispatch(
    addLogError(`fatal: pathspec '${argument}' did not match any files`)
  );
};

export const emulateCommit = ({ command, argument, flags }) => (
  dispatch,
  getState
) => {
  // committing with nothing staged
  const stagedFiles = getStagedFiles(getState());
  if (stagedFiles.length <= 0) {
    return dispatch(addLogInfo(`nothing to commit, working directory clean`));
  }

  // missing flags / unsupported flags
  if (!areEqual(flags, ['-m'])) {
    return dispatch(addLogError(`error: missing / unknown flag(s)`));
  }

  // committing with no commit message
  if (!argument) {
    return dispatch(addLogError(`error: commit message missing`));
  }

  return dispatch(gitCommit(argument));
};

const commandActionLookup = {
  add: emulateAdd,
  commit: emulateCommit,
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
