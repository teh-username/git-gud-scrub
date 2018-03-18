import { combineReducers } from 'redux';
import grapher from '../../utils/grapher';

const initialState = {
  history: {
    head: 'qa9j',
    branches: {
      master: 'qa9j',
      derp: 'kgxu',
    },
    commits: ['ko9z', 'plve', 'cb54', 'wnrw', 'kgxu', 'qa9j'],
    lookup: {
      ko9z: {
        message: 'commit message to appear in tooltip',
        children: ['plve', 'cb54'],
      },
      plve: {
        message: 'commit message to appear in tooltip',
        children: ['wnrw'],
      },
      cb54: {
        message: 'commit message to appear in tooltip',
        children: ['kgxu', 'qa9j'],
      },
      wnrw: {
        message: 'commit message to appear in tooltip',
        children: [],
      },
      kgxu: {
        message: 'commit message to appear in tooltip',
        children: [],
      },
      qa9j: {
        message: 'commit message to appear in tooltip',
        children: [],
      },
    },
  },
};

const lookup = (state = initialState.history.lookup, action) => state;
const commits = (state = initialState.history.commits, action) => state;
const branches = (state = initialState.history.branches, action) => state;
const head = (state = initialState.history.head, action) => state;

const history = combineReducers({
  lookup,
  commits,
  branches,
  head,
});

export default combineReducers({
  history,
});

export const getGraphFromState = ({ commitGraph: { history } }) =>
  grapher(history);
