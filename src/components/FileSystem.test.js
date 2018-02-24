import React from 'react';
import ReactDOM from 'react-dom';
import FileSystem, {
  File,
  FileList,
  NewFileForm,
  DuplicateFileNameWarning,
} from './FileSystem';
import { initialState } from '../redux/modules/fileSystem';

describe('FileSystem Component', () => {
  it('renders form if file count is less than max count', () => {
    const wrapper = shallow(<FileSystem {...initialState} />);
    expect(wrapper.find(NewFileForm).get(0)).not.toBeNull();
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render form if file count is equal to max count', () => {
    const wrapper = shallow(
      <FileSystem {...initialState} files={['a', 'b', 'c', 'd', 'e']} />
    );
    expect(wrapper.find(NewFileForm).get(0)).toBeNull();
    expect(wrapper).toMatchSnapshot();
  });

  describe('File Component', () => {
    it('renders an unmodified and tracked file entry correctly', () => {
      const wrapper = shallow(
        <File name="heyo.js" statuses={{ modified: false, tracked: true }} />
      );
      expect(wrapper.find('button').get(0)).not.toBeNull();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders an unmodified and untracked file entry correctly', () => {
      const wrapper = shallow(
        <File name="heyo.js" statuses={{ modified: false }} />
      );
      expect(wrapper.find('button').get(0)).toBeNull();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a modified file entry correctly', () => {
      const wrapper = shallow(
        <File name="heyo.js" statuses={{ modified: true }} />
      );
      expect(wrapper.find('button').get(0)).toBeNull();
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
      expect(wrapper.find(File).length).toEqual(2);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('NewFileForm Component', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<NewFileForm />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should display a duplicate warning if we try to enter the same filename twice', () => {
      const wrapper = shallow(
        <NewFileForm files={['heyo.js']} onAddFile={() => {}} />
      );
      expect(wrapper).toMatchSnapshot();
      wrapper.instance().onChange({ target: { value: 'heyo.js' } });
      wrapper.instance().onAddFile();
      expect(wrapper.state('hasDuplicate')).toEqual(true);
    });

    it('should call onAddFile with the correct argument', () => {
      const onAddFileSpy = jest.fn();
      const wrapper = shallow(
        <NewFileForm files={['heyo.js']} onAddFile={onAddFileSpy} />
      );
      wrapper.instance().onChange({ target: { value: 'woo.js' } });
      wrapper.instance().onAddFile();
      expect(wrapper.state('fileName')).toEqual('');
      expect(wrapper.state('hasDuplicate')).toEqual(false);
      expect(onAddFileSpy.mock.calls[0]).toEqual(['woo.js']);
    });
  });

  describe('DuplicateFileNameWarning', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<DuplicateFileNameWarning />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
