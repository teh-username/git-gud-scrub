import React from 'react';

const FileStatus = () => (
  <div className="col-lg-9 col-lg-pull-9 col-sm-12">
    <h4>File Status</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Untracked</th>
          <th>Unmodified</th>
          <th>Modified</th>
          <th>Staged</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div>Untracked</div>
          </td>
          <td>
            <div>Unmodified</div>
          </td>
          <td>
            <div>Modified</div>
          </td>
          <td>
            <div>Staged</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FileStatus;
