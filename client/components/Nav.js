import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <div id='nav'>
        <div id='header'>
          <h1>setup webpack</h1>
        </div>
        <div id='drop-down'>
          configs <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default Nav;