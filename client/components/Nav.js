import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  renderLogin() {
    if (this.state.loggedIn) {
      return <span>configs <i className="fa fa-caret-down" aria-hidden="true"></i></span>;
    } else {
      return <a href='#'>Log Into Github</a>;
    }
  }

  render() {
    return (
      <div id='nav'>
        <div id='header'>
          <h1>setup webpack</h1>
        </div>
        <div id='drop-down'>
          {this.renderLogin.call(this)}
        </div>
      </div>
    );
  }
}

export default Nav;