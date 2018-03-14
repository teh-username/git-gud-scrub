import {
  addFile,
  modifyFile,
  files as filesReducer,
  fileStatus as fileStatusReducer,
} from './fileSystem';

import { gitAdd, gitCommit } from './gitEmulator';

describe('fileSystem modules test', () => {
  describe('files reducer', () => {
    it('should return the initial state', () => {
      expect(filesReducer(undefined, {})).toEqual([]);
    });

    it('should add a new file on an empty array', () => {
      expect(filesReducer([], addFile('heyo.js'))).toEqual(['heyo.js']);
    });

    it('should append a new file on a non-empty array', () => {
      expect(filesReducer(['woop.js'], addFile('heyo.js'))).toEqual([
        'woop.js',
        'heyo.js',
      ]);
    });
  });

  describe('fileStatus reducer', () => {
    it('should return the initial state', () => {
      expect(fileStatusReducer(undefined, {})).toEqual({});
    });

    it('should add a new fileStatus on an empty object', () => {
      expect(fileStatusReducer({}, addFile('heyo.js'))).toEqual({
        'heyo.js': {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
      });
    });

    it('should append a new fileStatus on an non-empty object', () => {
      expect(
        fileStatusReducer(
          {
            'heya.js': {
              tracked: true,
              modified: false,
              staged: true,
            },
          },
          addFile('heyo.js')
        )
      ).toEqual({
        'heya.js': {
          tracked: true,
          modified: false,
          staged: true,
        },
        'heyo.js': {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
      });
    });

    it('should modify the status of the correct file', () => {
      let state = fileStatusReducer({}, addFile('darth_malak.js'));
      state = fileStatusReducer(state, addFile('darth_revan.js'));
      state = fileStatusReducer(state, modifyFile('darth_malak.js'));
      expect(state).toEqual({
        'darth_revan.js': {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
        'darth_malak.js': {
          tracked: false,
          modified: true,
          staged: undefined,
        },
      });
    });
  });

  describe('gitEmulator related actions', () => {
    it('should perform a GIT_ADD correctly', () => {
      let state = fileStatusReducer({}, addFile('darth_malak.js'));
      state = fileStatusReducer(state, addFile('darth_revan.js'));
      state = fileStatusReducer(state, gitAdd('darth_malak.js'));
      expect(state).toEqual({
        'darth_revan.js': {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
        'darth_malak.js': {
          tracked: true,
          modified: false,
          staged: true,
        },
      });
    });

    it('should perform a GIT_COMMIT correctly', () => {
      let state = fileStatusReducer({}, addFile('darth_malak.js'));
      state = fileStatusReducer(state, addFile('darth_revan.js'));
      state = fileStatusReducer(state, addFile('darth_bane.js'));
      state = fileStatusReducer(state, addFile('darth_maul.js'));

      state = fileStatusReducer(state, gitAdd('darth_bane.js'));
      state = fileStatusReducer(state, gitAdd('darth_maul.js'));

      state = fileStatusReducer(state, gitCommit('Add more sith lords'));

      expect(state).toEqual({
        'darth_malak.js': {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
        'darth_revan.js': {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
        'darth_bane.js': {
          tracked: true,
          modified: false,
          staged: false,
        },
        'darth_maul.js': {
          tracked: true,
          modified: false,
          staged: false,
        },
      });
    });
  });
});
