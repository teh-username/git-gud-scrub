import { connect } from 'react-redux';

import Terminal from '../components/Terminal';
import { getEntries } from '../redux/modules/terminal';

const mapStateToProps = state => ({
  entries: getEntries(state)
});

export default connect(mapStateToProps)(Terminal);
