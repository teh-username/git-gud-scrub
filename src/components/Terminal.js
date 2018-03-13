import React from 'react';

// Console design ripped from https://onlywei.github.io/explain-git-with-d3/
class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };

    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInput(userInput) {
    this.setState({ userInput });
  }

  onSubmit(event) {
    event.preventDefault();
    const { userInput } = this.state;
    if (userInput) {
      this.props.handleInput(this.state.userInput);
      this.setState({ userInput: '' });
    }
  }

  render() {
    const { userInput } = this.state;
    const { entries } = this.props;
    return (
      <div className="col-lg-3 col-lg-push-3 col-sm-12 console">
        <h4>Terminal</h4>
        <div className="control-box">
          <div className="log">
            <div className="log-inner">
              <div className="info">Enter your git commands here!</div>
              <div className="entries">
                {entries.map(({ text, logLevel }, index) => (
                  <div key={index} className={logLevel}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form onSubmit={this.onSubmit} className="control-box-form">
            <input
              spellCheck={false}
              type="text"
              value={userInput}
              placeholder=" enter git command"
              onChange={({ target }) => this.onInput(target.value)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Terminal;
