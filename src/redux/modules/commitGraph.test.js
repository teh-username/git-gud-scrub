import {
  head as headReducer,
  commits as commitsReducer,
  lookup as lookupReducer,
} from './commitGraph';
import { gitCheckoutBranch, gitCommit } from './gitEmulator';

describe('commitGraph modules test', () => {
  describe('head reducer', () => {
    it('should return the initial state', () => {
      expect(headReducer(undefined, {})).toEqual('master');
    });

    it('should return the correct new head reference on checkout', () => {
      expect(headReducer('master', gitCheckoutBranch('test'))).toEqual('test');
    });
  });

  describe('commits reducer', () => {
    it('should return the initial state', () => {
      expect(commitsReducer(undefined, {})).toEqual(['vkf5as']);
    });

    it('should append new commit on existing array of commits', () => {
      expect(
        commitsReducer(['test'], gitCommit('msg', 'parent', 'ref'))
      ).toEqual(['test', 'ref']);
    });
  });

  describe('lookup reducer', () => {
    it('should return the initial state', () => {
      expect(lookupReducer(undefined, {})).toEqual({
        vkf5as: {
          message: "Hi! I'm the initial commit",
          children: [],
        },
      });
    });

    it('should correctly add a lookup entry on a new commit', () => {
      expect(
        lookupReducer(undefined, gitCommit('msg', 'vkf5as', 'test'))
      ).toEqual(
        expect.objectContaining({
          test: {
            message: 'msg',
            children: [],
          },
        })
      );
    });

    it('should correctly update the children of the parent commit', () => {
      expect(
        lookupReducer(undefined, gitCommit('msg', 'vkf5as', 'test'))
      ).toEqual(
        expect.objectContaining({
          vkf5as: {
            message: "Hi! I'm the initial commit",
            children: ['test'],
          },
        })
      );
    });
  });
});
