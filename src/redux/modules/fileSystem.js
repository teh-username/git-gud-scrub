import { combineReducers } from 'redux';
import { GIT_ADD, GIT_COMMIT } from './gitEmulator';

export const MAX_FILE_COUNT = 5;
const ADD_FILE = 'modules/fileSystem/ADD_FILE';
const MODIFY_FILE = 'modules/fileSystem/MODIFY_FILE';

/*
  Sample state:
  {
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
*/

export const initialState = {
  files: [],
  fileStatus: {},
};

export const files = (state = initialState.files, action) => {
  switch (action.type) {
    case ADD_FILE:
      return [...state, action.fileName];
    default:
      return state;
  }
};

export const fileStatus = (state = initialState.fileStatus, action) => {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        [action.fileName]: {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
      };
    case MODIFY_FILE:
      return {
        ...state,
        [action.fileName]: {
          ...state[action.fileName],
          modified: true,
        },
      };
    case GIT_ADD:
      return {
        ...state,
        [action.fileName]: {
          ...state[action.fileName],
          tracked: true,
          staged: true,
          modified: false,
        },
      };
    case GIT_COMMIT:
      return Object.entries(state)
        .filter(([fileName, statuses]) => statuses.staged)
        .reduce((previousState, [fileName, statuses]) => {
          return {
            ...previousState,
            [fileName]: {
              ...previousState[fileName],
              staged: false,
            },
          };
        }, state);
    default:
      return state;
  }
};

export default combineReducers({
  files,
  fileStatus,
});

export const addFile = fileName => ({
  type: ADD_FILE,
  fileName,
});

export const modifyFile = fileName => ({
  type: MODIFY_FILE,
  fileName,
});

export const getFiles = ({ fileSystem }) => fileSystem.files;
export const getFileStatus = ({ fileSystem }) => fileSystem.fileStatus;
