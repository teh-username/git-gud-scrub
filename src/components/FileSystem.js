import React from 'react';

const FileSystem = () => (
  <div className="col-lg-3 col-sm-12">
    <h4>Files (Max of 5)</h4>
    <ul>
      <li>
        <span>File</span>
        <button className="btn btn-link btn-sm">Modify</button>
      </li>
    </ul>
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Filename" />
      <span className="input-group-btn">
        <button className="btn btn-secondary" type="button">
          Add File
        </button>
      </span>
    </div>
    <div className="alert alert-warning" role="alert">
      <strong>Warning!</strong> That filename is already taken bud.
    </div>
  </div>
);

export default FileSystem;
