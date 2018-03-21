import { addLogInfo, addLogError } from './terminal';
import { getFiles, getStagedFiles } from './fileSystem';
import { areEqual } from '../../utils/arrayOperators';
import { commandRebuilder } from '../../utils/commandProcessor';
import {
  getHeadReference,
  getBranches,
  getBranchReference,
} from './commitGraph';

export const GIT_ADD = 'modules/gitEmulator/GIT_ADD';
export const GIT_COMMIT = 'modules/gitEmulator/GIT_COMMIT';
export const GIT_BRANCH_ADD = 'modules/gitEmulator/GIT_BRANCH_ADD';
export const GIT_BRANCH_DELETE = 'modules/gitEmulator/GIT_BRANCH_DELETE';

export const gitAdd = fileName => ({
  type: GIT_ADD,
  fileName,
});

export const gitCommit = message => ({
  type: GIT_COMMIT,
  message,
});

export const gitAddBranch = (name, ref) => ({
  type: GIT_BRANCH_ADD,
  name,
  ref,
});

export const gitDeleteBranch = name => ({
  type: GIT_BRANCH_DELETE,
  name,
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

export const emulateBranch = ({ command, argument, flags }) => (
  dispatch,
  getState
) => {
  const branches = getBranches(getState());

  // Handle case for branch deletion
  if (areEqual(flags, ['-d'])) {
    if (!argument) {
      return dispatch(addLogError('fatal: branch name required'));
    }
    if (!branches.includes(argument)) {
      return dispatch(addLogError(`error: branch '${argument}' not found.`));
    }
    if (
      getBranchReference(getState(), argument) === getHeadReference(getState())
    ) {
      return dispatch(
        addLogError(
          `error: Cannot delete the branch '${argument}' which you are currently on`
        )
      );
    }
    return dispatch(gitDeleteBranch(argument));
  }

  // Handle case for empty branch name
  if (!argument) {
    return dispatch(addLogInfo(branches.join(', ')));
  }

  // Handle case for duplicate branch name
  if (branches.includes(argument)) {
    return dispatch(
      addLogError(`fatal: A branch named '${argument}' already exists`)
    );
  }

  return dispatch(gitAddBranch(argument, getHeadReference(getState())));
};

const commandActionLookup = {
  add: emulateAdd,
  commit: emulateCommit,
  branch: emulateBranch,
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
