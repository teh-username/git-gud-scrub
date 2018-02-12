import React from 'react';

export const getFilesByState = (fileStates, state, targetValue) =>
  Object.entries(fileStates).reduce(
    (acc, [fileName, fileState]) =>
      fileState[state] === targetValue ? [...acc, fileName] : acc,
    []
  );

export const FileStatusRow = ({ prefix, files }) =>
  files.map(fileName => <div key={`${prefix}-${fileName}`}>{fileName}</div>);

export const FileStatusTable = ({ fileStates }) => (
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
          <FileStatusRow
            prefix="ut"
            files={getFilesByState(fileStates, 'tracked', false)}
          />
        </td>
        <td>
          <FileStatusRow
            prefix="umod"
            files={getFilesByState(fileStates, 'modified', false)}
          />
        </td>
        <td>
          <FileStatusRow
            prefix="mod"
            files={getFilesByState(fileStates, 'modified', true)}
          />
        </td>
        <td>
          <FileStatusRow
            prefix="st"
            files={getFilesByState(fileStates, 'staged', true)}
          />
        </td>
      </tr>
    </tbody>
  </table>
);

const FileStatus = ({ fileStates }) => (
  <div className="col-lg-9 col-lg-pull-9 col-sm-12">
    <h4>File Status</h4>
    <FileStatusTable fileStates={fileStates} />
  </div>
);

export default FileStatus;
