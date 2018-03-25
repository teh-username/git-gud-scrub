import React from 'react';
import FileStatus, {
  FileStatusRow,
  FileStatusTable,
  getFilesByState,
} from './FileStatus';

describe('FileStatus Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FileStatus fileStates={{}} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('FileStatusRow Component', () => {
    it('renders the correct amount of divs', () => {
      const wrapper = shallow(
        <FileStatusRow prefix="ut" files={['heyo', 'woo', 'woof']} />
      );
      expect(wrapper.at(0).find('div').length).toEqual(3);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('FileStatusTable Component', () => {
    it('renders the table correclty', () => {
      const wrapper = shallow(
        <FileStatusTable
          fileStates={{
            revan: {
              tracked: false,
              modified: undefined,
              staged: undefined,
            },
            malak: {
              tracked: true,
              modified: true,
              staged: true,
            },
            bastila: {
              tracked: true,
              modified: false,
              staged: true,
            },
          }}
        />
      );
      expect(wrapper.find({ prefix: 'ut' }).props()).toEqual({
        prefix: 'ut',
        files: ['revan'],
      });
      expect(wrapper.find({ prefix: 'mod' }).props()).toEqual({
        prefix: 'mod',
        files: ['malak'],
      });
      expect(wrapper.find({ prefix: 'umod' }).props()).toEqual({
        prefix: 'umod',
        files: ['bastila'],
      });
      expect(wrapper.find({ prefix: 'st' }).props()).toEqual({
        prefix: 'st',
        files: ['malak', 'bastila'],
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('getFilesByState function', () => {
    it('builds the correct array', () => {
      const fileStates = {
        revan: {
          tracked: false,
          modified: undefined,
          staged: undefined,
        },
        malak: {
          tracked: true,
          modified: true,
          staged: true,
        },
        bastila: {
          tracked: true,
          modified: false,
          staged: true,
        },
      };
      expect(getFilesByState(fileStates, 'tracked', false)).toEqual(['revan']);
      expect(getFilesByState(fileStates, 'tracked', true)).toEqual([
        'malak',
        'bastila',
      ]);
      expect(getFilesByState(fileStates, 'modified', true)).toEqual(['malak']);
      expect(getFilesByState(fileStates, 'staged', true)).toEqual([
        'malak',
        'bastila',
      ]);
    });
  });
});
