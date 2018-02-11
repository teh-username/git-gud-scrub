import {
  addFile,
  files as filesReducer,
  fileStatus as fileStatusReducer,
} from './fileSystem';

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
          modified: false,
          staged: false,
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
          modified: false,
          staged: false,
        },
      });
    });
  });
});
