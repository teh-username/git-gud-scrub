import { connect } from 'react-redux';

import CommitGraph from '../components/CommitGraph';
import { getGraphFromState } from '../redux/modules/commitGraph';

const mapStateToProps = state => ({
  graphData: getGraphFromState(state),
});

export default connect(mapStateToProps)(CommitGraph);
