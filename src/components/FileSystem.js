import React from 'react';
import { MAX_FILE_COUNT as maxFileCount } from '../redux/modules/fileSystem';

export const File = ({ name, statuses }) => (
  <li>
    <span>{name}</span>
    {!statuses.modified &&
      statuses.tracked && (
        <button className="btn btn-link btn-sm">Modify</button>
      )}
  </li>
);

export const FileList = ({ files, fileStatus }) => (
  <ul>
    {files.map(name => (
      <File key={name} name={name} statuses={fileStatus[name]} />
    ))}
  </ul>
);

export class NewFileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      hasDuplicate: false,
    };
    this.onAddFile = this.onAddFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ fileName: event.target.value });
  }

  onAddFile() {
    if (this.props.files.includes(this.state.fileName)) {
      this.setState({
        hasDuplicate: true,
      });
    } else {
      this.props.onAddFile(this.state.fileName);
      this.setState({ fileName: '', hasDuplicate: false });
    }
  }

  render() {
    const { fileName, hasDuplicate } = this.state;
    return (
      <div>
        <div className="input-group">
          <input
            value={fileName}
            type="text"
            className="form-control"
            placeholder="Filename"
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={this.onAddFile}
            >
              Add File
            </button>
          </span>
        </div>
        {hasDuplicate && <DuplicateFileNameWarning />}
      </div>
    );
  }
}

export const DuplicateFileNameWarning = () => (
  <div className="alert alert-warning" role="alert">
    <strong>Warning!</strong> That filename is already taken bud.
  </div>
);

const FileSystem = ({ files, fileStatus, addFile }) => (
  <div className="col-lg-3 col-sm-12">
    <h4>Files (Max of {maxFileCount})</h4>
    {files.length < maxFileCount && (
      <NewFileForm onAddFile={addFile} files={files} />
    )}
    <FileList files={files} fileStatus={fileStatus} />
  </div>
);

export default FileSystem;
