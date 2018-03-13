import { combineReducers } from 'redux';

const ADD_LOG_INFO = 'modules/terminal/ADD_LOG_INFO';
export const ADD_LOG_ERROR = 'modules/terminal/ADD_LOG_ERROR';

/*
  Sample state:
  {
    entries: [
      {
        text: 'git status',
        logLevel: 'info',
      },
      {
        text: 'wat',
        logLevel: 'error',
      },
    ]
  }
*/
export const initialState = {
  entries: [],
};

export const entries = (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_LOG_INFO:
      return [...state, { text: action.text, logLevel: 'info' }];
    case ADD_LOG_ERROR:
      return [...state, { text: action.text, logLevel: 'error' }];
    default:
      return state;
  }
};

export default combineReducers({
  entries,
});

export const addLogInfo = text => ({
  type: ADD_LOG_INFO,
  text,
});

export const addLogError = text => ({
  type: ADD_LOG_ERROR,
  text,
});

export const getEntries = ({ terminal }) => terminal.entries;
