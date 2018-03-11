export const GIT_ADD = 'modules/gitEmulator/GIT_ADD';

export const gitAdd = fileName => ({
  type: GIT_ADD,
  fileName
});

const gitCommandActionLookup = {
  add: gitAdd
};

export const executeCommand = input => dispatch => {
  // TODO: add check if command does not exist
  const { command, argument, flags } = input;
  const gitCommand = gitCommandActionLookup[command];
  dispatch(gitCommand(argument, flags));
};
