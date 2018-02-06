import { connect } from 'react-redux';

import FileSystem from '../components/FileSystem';
import { getFiles, getFileStatus } from '../reducers/fileSystem';

const mapStateToProps = state => ({
  files: getFiles(state),
  fileStatus: getFileStatus(state),
});

export default connect(mapStateToProps, null)(FileSystem);
