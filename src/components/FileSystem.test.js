import React from 'react';
import ReactDOM from 'react-dom';
import FileSystem, { File, FileList } from './FileSystem';
import { initialState } from '../redux/modules/fileSystem';

describe('FileSystem Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FileSystem {...initialState} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('File Component', () => {
    it('renders a unmodified file entry correctly', () => {
      const wrapper = shallow(
        <File name="heyo.js" statuses={{ modified: false }} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a modified file entry correctly', () => {
      const wrapper = shallow(
        <File name="heyo.js" statuses={{ modified: true }} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('FileList Component', () => {
    it('renders the correct number of File entries', () => {
      const wrapper = shallow(
        <FileList
          files={['heyo.js', 'heya.js']}
          fileStatus={{
            'heyo.js': { modified: true },
            'heya.js': { modified: false },
          }}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
