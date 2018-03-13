import { GIT_ADD, emulateAdd } from './gitEmulator';
import { ADD_LOG_ERROR } from './terminal';
import mockStore from '../../utils/mockStore';

describe('gitEmulator module test', () => {
  describe('emulateAdd test', () => {
    it('should dispatch GIT_ADD when ADD-ing an existing filename', () => {
      const initialState = {
        fileSystem: {
          files: ['darth_malak.py'],
        },
      };

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
});
