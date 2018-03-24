import { combineReducers } from 'redux';
import {
  GIT_BRANCH_ADD,
  GIT_BRANCH_DELETE,
  GIT_BRANCH_CHECKOUT,
  GIT_COMMIT,
} from './gitEmulator';
import grapher from '../../utils/grapher';

const initialState = {
  head: 'master',
  branches: {
    master: 'vkf5as',
  },
  commits: ['vkf5as'],
  lookup: {
    vkf5as: {
      message: "Hi! I'm the initial commit",
      children: [],
    },
  },
};

export const lookup = (state = initialState.lookup, action) => {
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
export const commits = (state = initialState.commits, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return [...state, action.ref];
    default:
      return state;
  }
};
export const branches = (state = initialState.branches, action) => {
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
      return {
        ...state,
        [action.currentBranch]: action.ref,
      };
    default:
      return state;
  }
};
export const head = (state = initialState.head, action) => {
  switch (action.type) {
    case GIT_BRANCH_CHECKOUT:
      return action.name;
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

export const getCurrentBranch = ({ commitGraph: { head } }) => head;
export const getHeadReference = ({ commitGraph: { head, branches } }) =>
  branches[head];
export const getBranchReference = ({ commitGraph: { branches } }, branch) =>
  branches[branch];
export const getBranches = ({ commitGraph: { branches } }) =>
  Object.keys(branches);
