import { head as headReducer, commits as commitsReducer } from './commitGraph';
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
});
