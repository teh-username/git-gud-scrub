import {
  GIT_ADD,
  GIT_COMMIT,
  GIT_BRANCH_ADD,
  emulateAdd,
  emulateCommit,
  executeCommand,
  emulateBranch,
} from './gitEmulator';
import { ADD_LOG_INFO, ADD_LOG_ERROR } from './terminal';
import { initialState as commitGraphState } from './commitGraph';
import mockStore from '../../utils/mockStore';

describe('gitEmulator module test', () => {
  const initialState = {
    fileSystem: {
      files: ['darth_malak.py'],
    },
  };
  describe('emulateAdd test', () => {
    it('should dispatch GIT_ADD when ADD-ing an existing filename', () => {
      const expectedActions = [{ type: GIT_ADD, fileName: 'darth_malak.py' }];
      const store = mockStore(initialState);
      store.dispatch(
        emulateAdd({
          command: 'add',
          argument: 'darth_malak.py',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch ADD_LOG_ERROR when ADD-ing a non-existent filename', () => {
      const initialState = {
        fileSystem: {
          files: ['darth_revan.py'],
        },
      };

      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: `fatal: pathspec 'darth_malak.py' did not match any files`,
        },
      ];
      const store = mockStore(initialState);
      store.dispatch(
        emulateAdd({
          command: 'add',
          argument: 'darth_malak.py',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('emulateCommit test', () => {
    const baseState = {
      fileSystem: {
        files: ['bane'],
        fileStatus: {
          bane: {
            tracked: true,
            staged: true,
            modified: false,
          },
        },
      },
      commitGraph: commitGraphState,
    };

    it('should handle committing with nothing staged', () => {
      const caseState = {
        ...baseState,
        fileSystem: {
          ...baseState.fileSystem,
          fileStatus: {
            ...baseState.fileSystem.fileStatus,
            bane: {
              ...baseState.fileSystem.fileStatus.bane,
              staged: false,
            },
          },
        },
      };

      const expectedActions = [
        {
          type: ADD_LOG_INFO,
          text: 'nothing to commit, working directory clean',
        },
      ];
      const store = mockStore(caseState);
      store.dispatch(
        emulateCommit({
          command: 'commit',
          flags: ['-m'],
          argument: 'test commit',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should handle missing flag', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: 'error: missing / unknown flag(s)',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateCommit({
          command: 'commit',
          flags: [],
          argument: 'test commit',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should handle unsupported flags', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: 'error: missing / unknown flag(s)',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateCommit({
          command: 'commit',
          flags: ['-asd', '-wot'],
          argument: 'test commit',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should handle missing commit message', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: 'error: commit message missing',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateCommit({
          command: 'commit',
          flags: ['-m'],
          argument: '',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch correct action on valid commit', () => {
      const expectedActions = [
        {
          type: GIT_COMMIT,
          message: 'test commit',
          parentRef: 'vkf5as',
          ref: expect.any(String),
          currentBranch: 'master',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateCommit({
          command: 'commit',
          flags: ['-m'],
          argument: 'test commit',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('emulateBranch test', () => {
    const baseState = {
      commitGraph: commitGraphState,
    };

    it('handles no argument and no flags', () => {
      const expectedActions = [
        {
          type: ADD_LOG_INFO,
          text: 'master',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: [],
          argument: '',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles valid argument and with invalid flags', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: 'error: missing / unknown flag(s)',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: ['-asd'],
          argument: 'test',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles missing argument and with valid flags', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: 'fatal: branch name required',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: ['-d'],
          argument: '',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles deletion of non-existing branch', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: `error: branch 'doh' not found`,
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: ['-d'],
          argument: 'doh',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles deletion of branch currently checked out', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: `error: Cannot delete the branch 'master' which you are currently on`,
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: ['-d'],
          argument: 'master',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles creation of duplicate branch', () => {
      const expectedActions = [
        {
          type: ADD_LOG_ERROR,
          text: `fatal: A branch named 'master' already exists`,
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: [],
          argument: 'master',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles creation valid branch', () => {
      const expectedActions = [
        {
          type: GIT_BRANCH_ADD,
          name: 'test',
          ref: 'vkf5as',
        },
      ];
      const store = mockStore(baseState);
      store.dispatch(
        emulateBranch({
          command: 'branch',
          flags: [],
          argument: 'test',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('executeCommand test', () => {
    it('should dispatch ADD_LOG_ERROR when executing a non-git command', () => {
      const expectedActions = [
        {
          type: ADD_LOG_INFO,
          text: 'tail -f id.rsa',
        },
        {
          type: ADD_LOG_ERROR,
          text: `command not found: tail`,
        },
      ];
      const store = mockStore({});
      store.dispatch(
        executeCommand({
          executable: 'tail',
          flags: ['-f'],
          argument: 'id.rsa',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch ADD_LOG_ERROR when executing an unsupported git command', () => {
      const expectedActions = [
        {
          type: ADD_LOG_INFO,
          text: 'git doyouknowdawei -a id.rsa',
        },
        {
          type: ADD_LOG_ERROR,
          text: `git: 'doyouknowdawei' is not a git command.`,
        },
      ];
      const store = mockStore({});
      store.dispatch(
        executeCommand({
          executable: 'git',
          command: 'doyouknowdawei',
          flags: ['-a'],
          argument: 'id.rsa',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch correct command when executing a valid git command', () => {
      const expectedActions = [
        {
          type: ADD_LOG_INFO,
          text: 'git add darth_malak.py',
        },
        {
          type: GIT_ADD,
          fileName: 'darth_malak.py',
        },
      ];
      const store = mockStore(initialState);
      store.dispatch(
        executeCommand({
          executable: 'git',
          command: 'add',
          argument: 'darth_malak.py',
        })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
