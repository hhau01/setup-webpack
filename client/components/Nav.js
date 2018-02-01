import React, { Component } from 'react';
import Menu from './Menu';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuSelected: false
    };
  }

  handleMenu() {
    this.setState(prevState => {
      return { menuSelected: !prevState.menuSelected };
    });
  }

  componentWillMount() {
    fetch('/auth', { credentials: 'include' }).then(response => response.json()).then((user) => {
      this.props.setUser(user);
    });
  }

  renderLogin() {
    if (this.props.user.username) {
      const formattedName = this.props.user.username.replace(/"/g, '');
      return <span onClick={this.handleMenu.bind(this)}><strong>{formattedName}</strong> | configs <i className="fa fa-caret-down" aria-hidden="true"></i></span>;
    }
    return <a href="/oauth/github">Log Into Github</a>;
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
        {this.state.menuSelected && <Menu />}
      </div>
    );
  }
}

export default Nav;
