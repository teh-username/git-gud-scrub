import { connect } from 'react-redux';

import FileStatus from '../components/FileStatus';
import { getFileStatus } from '../redux/modules/fileSystem';

const mapStateToProps = state => ({
  fileStates: getFileStatus(state),
});

export default connect(mapStateToProps, null)(FileStatus);
