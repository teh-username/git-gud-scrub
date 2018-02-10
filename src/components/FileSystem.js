import React from 'react';
import { MAX_FILE_COUNT as maxFileCount } from '../redux/modules/fileSystem';

const File = ({ name, statuses }) => (
  <li>
    <span>{name}</span>
    {!statuses.modified && (
      <button className="btn btn-link btn-sm">Modify</button>
    )}
  </li>
);

const FileList = ({ files, fileStatus }) => (
  <ul>
    {files.map(name => (
      <File key={name} name={name} statuses={fileStatus[name]} />
    ))}
  </ul>
);

class NewFileForm extends React.Component {
  render() {
    return (
      <div>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Filename" />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button">
              Add File
            </button>
          </span>
        </div>
        <DuplicateFileNameWarning />
      </div>
    );
  }
}

const DuplicateFileNameWarning = () => (
  <div className="alert alert-warning" role="alert">
    <strong>Warning!</strong> That filename is already taken bud.
  </div>
);

const FileSystem = ({ files, fileStatus }) => (
  <div className="col-lg-3 col-sm-12">
    <h4>Files (Max of {maxFileCount})</h4>
    <FileList files={files} fileStatus={fileStatus} />
    <NewFileForm />
  </div>
);

export default FileSystem;
