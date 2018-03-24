import { head as headReducer } from './commitGraph';
import { gitCheckoutBranch } from './gitEmulator';

describe('commitGraph modules test', () => {
  describe('head reducer', () => {
    it('should return the initial state', () => {
      expect(headReducer(undefined, {})).toEqual('master');
    });

    it('should return the correct new head reference on checkout', () => {
      expect(headReducer('master', gitCheckoutBranch('test'))).toEqual('test');
    });
  });
});
