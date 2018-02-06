import { combineReducers } from 'redux';

export const initialState = {
  files: ['woof.py', 'ruff.py'],
  fileStatus: {
    'woof.py': {
      tracked: true,
      modified: true,
      staged: true,
    },
    'ruff.py': {
      tracked: true,
      modified: true,
      staged: true,
    },
  },
};

const files = (state = initialState.files, action) => {
  return state;
};
const fileStatus = (state = initialState.fileStatus, action) => {
  return state;
};

export default combineReducers({
  files,
  fileStatus,
});

export const getFiles = ({ fileSystem }) => fileSystem.files;
export const getFileStatus = ({ fileSystem }) => fileSystem.fileStatus;
