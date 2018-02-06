import React from 'react';

// Ripped from http://www.wei-wang.com/ExplainGitWithD3
const Terminal = () => (
  <div className="col-lg-3 col-lg-push-3 col-sm-12">
    <h4>Terminal</h4>
    <div className="control-box" style={{ height: '220px' }}>
      <div className="log" style={{ height: '195' }}>
        <div className="info">Enter your git commands here!</div>
        <div>
          <div className="info">Info</div>
          <div className="error">Error</div>
        </div>
      </div>
      <input type="text" placeholder=" enter git command" />
    </div>
  </div>
);

export default Terminal;
