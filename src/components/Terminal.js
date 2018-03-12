import React from 'react';

// Ripped from https://onlywei.github.io/explain-git-with-d3/
const Terminal = ({ entries }) => (
  <div className="col-lg-3 col-lg-push-3 col-sm-12 console">
    <h4>Terminal</h4>
    <div className="control-box" style={{ height: '220px' }}>
      <div className="log" style={{ height: '195' }}>
        <div className="info">Enter your git commands here!</div>
        <div className="entries">
          {entries.map(({ text, logLevel }, index) => (
            <div key={index} className={logLevel}>
              {text}
            </div>
          ))}
        </div>
      </div>
      <input type="text" placeholder=" enter git command" />
    </div>
  </div>
);

export default Terminal;
