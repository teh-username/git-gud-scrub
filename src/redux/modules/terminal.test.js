import { entries as entriesReducer, addLogInfo, addLogError } from './terminal';

describe('terminal modules test', () => {
  describe('entries reducer', () => {
    it('should return the initial state', () => {
      expect(entriesReducer(undefined, {})).toEqual([]);
    });

    it('should add an entry on an empty array', () => {
      expect(entriesReducer([], addLogInfo('Darth Revan'))).toEqual([
        {
          text: 'Darth Revan',
          logLevel: 'info'
        }
      ]);
    });

    it('should add an entry on a non-empty array', () => {
      expect(
        entriesReducer(
          [
            {
              text: 'Darth Revan',
              logLevel: 'info'
            }
          ],
          addLogError('Darth Malak')
        )
      ).toEqual([
        {
          text: 'Darth Revan',
          logLevel: 'info'
        },
        {
          text: 'Darth Malak',
          logLevel: 'error'
        }
      ]);
    });
  });
});
