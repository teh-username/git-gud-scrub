import { combineReducers } from 'redux';
import {
  GIT_BRANCH_ADD,
  GIT_BRANCH_DELETE,
  GIT_BRANCH_CHECKOUT,
  GIT_COMMIT,
} from './gitEmulator';
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

const lookup = (state = initialState.lookup, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return {
        ...state,
        [action.parentRef]: {
          ...state[action.parentRef],
          children: [...state[action.parentRef].children, action.ref],
        },
        [action.ref]: {
          message: action.message,
          children: [],
        },
      };
    default:
      return state;
  }
};
const commits = (state = initialState.commits, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return [...state, action.ref];
    default:
      return state;
  }
};
const branches = (state = initialState.branches, action) => {
  switch (action.type) {
    case GIT_BRANCH_ADD:
      return {
        ...state,
        [action.name]: action.ref,
      };
    case GIT_BRANCH_DELETE:
      return Object.entries(state)
        .filter(([branch, ref]) => branch !== action.name)
        .reduce(
          (acc, [branch, ref]) => ({
            ...acc,
            [branch]: ref,
          }),
          {}
        );
    case GIT_COMMIT:
      return Object.entries(state)
        .filter(([branch, ref]) => ref === action.parentRef)
        .reduce(
          (acc, [branch, _]) => ({
            ...acc,
            [branch]: action.ref,
          }),
          { ...state }
        );
    default:
      return state;
  }
};
const head = (state = initialState.head, action) => {
  switch (action.type) {
    case GIT_BRANCH_CHECKOUT:
    case GIT_COMMIT:
      return action.ref;
    default:
      return state;
  }
};

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
export const getBranchReference = ({ commitGraph: { branches } }, branch) =>
  branches[branch];
export const getBranches = ({ commitGraph: { branches } }) =>
  Object.keys(branches);
