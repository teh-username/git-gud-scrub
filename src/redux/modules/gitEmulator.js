export const GIT_ADD = 'modules/gitEmulator/GIT_ADD';

export const gitAdd = fileName => ({
  type: GIT_ADD,
  fileName
});
