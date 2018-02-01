import React, { Component } from 'react';

class Nav extends Component {

  componentWillMount() {
    fetch('/auth', { credentials: 'include' }).then(response => response.json()).then((user) => {
      this.props.setUser(user);
    });
  }

  renderLogin() {
    if (this.props.user.username) {
      const formattedName = this.props.user.username.replace(/"/g, '');
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
