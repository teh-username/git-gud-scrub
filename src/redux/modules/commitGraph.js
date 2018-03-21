import { combineReducers } from 'redux';
import { GIT_BRANCH } from './gitEmulator';
import grapher from '../../utils/grapher';

const initialState = {
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
};

const lookup = (state = initialState.lookup, action) => state;
const commits = (state = initialState.commits, action) => state;
const branches = (state = initialState.branches, action) => {
  switch (action.type) {
    case GIT_BRANCH:
      return {
        ...state,
        [action.name]: action.ref,
      };
    default:
      return state;
  }
};
const head = (state = initialState.head, action) => state;

export default combineReducers({
  lookup,
  commits,
  branches,
  head,
});

export const getGraphFromState = ({
  commitGraph: { lookup, commits, branches, head },
}) =>
  grapher({
    lookup,
    commits,
    branches,
    head,
  });

export const getHeadReference = ({ commitGraph: { head } }) => head;
export const getBranches = ({ commitGraph: { branches } }) =>
  Object.keys(branches);
