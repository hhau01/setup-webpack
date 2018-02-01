import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentWillMount() {
    fetch('/auth', { credentials: 'include' }).then(response => response.json()).then((user) => {
      this.setState({ user });
    });
  }

  renderLogin() {
    if (this.state.user.username) {
      const formattedName = this.state.user.username.replace(/"/g, '');
      return <span><strong>{formattedName}</strong> | configs <i className="fa fa-caret-down" aria-hidden="true"></i></span>;
    }
    return <a href="/oauth/github">Log Into Github</a>;
  }

  render() {
    return (
      <div id="nav">
        <div id="header">
          <h1>setup webpack</h1>
        </div>
        <div id="drop-down">
          {this.renderLogin.call(this)}
        </div>
      </div>
    );
  }
}

export default Nav;
