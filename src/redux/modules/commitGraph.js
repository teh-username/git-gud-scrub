import { combineReducers } from 'redux';
import grapher from '../../utils/grapher';

const initialState = {
  history: {
    head: 'qa9j',
    branches: {
      master: 'qa9j',
      derp: 'kgxu',
      nope: 'wnrw',
    },
    commits: ['ko9z', 'plve', 'cb54', 'wnrw', 'kgxu', 'qa9j'],
    lookup: {
      ko9z: {
        message: 'Lorem ipsum dolor sit amet',
        children: ['plve', 'cb54'],
      },
      plve: {
        message: 'consectetur adipiscing elit',
        children: ['wnrw'],
      },
      cb54: {
        message: 'Donec molestie dictum dolor',
        children: ['kgxu', 'qa9j'],
      },
      wnrw: {
        message: 'Curabitur maximus ante velit',
        children: [],
      },
      kgxu: {
        message: ' Aenean sit amet enim at tellus vulputate consectetur',
        children: [],
      },
      qa9j: {
        message: 'Nullam auctor sapien a laoreet luctus',
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
