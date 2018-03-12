import { connect } from 'react-redux';

import Terminal from '../components/Terminal';
import { getEntries } from '../redux/modules/terminal';
import { executeCommand } from '../redux/modules/gitEmulator';
import { commandParser } from '../utils/commandProcessor';

const mapStateToProps = state => ({
  entries: getEntries(state)
});

const mapDispatchToProps = dispatch => ({
  handleInput: input => {
    dispatch(executeCommand(commandParser(input)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
