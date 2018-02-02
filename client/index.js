import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';
import Nav from './components/Nav';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';
import Generation from './components/Generation';
import { get } from 'react-agent';
import Menu from './components/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      menu: false,
      configs: []
    };
  }
  
  setUser(user) {
    this.setState({ user }, () => {
      if (this.state.user.username) {
        this.fetchConfigs();
      }
    });
  }

  fetchConfigs() {
    fetch('/users/configs', { credentials: 'include' }).then(res => res.json()).then(data => {
      this.setState({ configs: data.configs });
    });
  }

  checkUser() {
    if (this.state.user.username) return true;
    return false;
  }

  handleMenu() {
    this.setState(prevState => ({ menu: !prevState.menu }));
  }

  render() {
    return (
      <div id='app'>
        <Nav handleMenu={this.handleMenu.bind(this)} setUser={this.setUser.bind(this)} user={this.state.user} />
        <Menu handleMenu={this.handleMenu.bind(this)} selected={this.state.menu} configs={this.state.configs} />
        <div id='mid'>
          <ConfigContainer />
          <Generation fetchConfigs={this.fetchConfigs.bind(this)} checkUser={this.checkUser.bind(this)} />
        </div>
      </div>
    );
  }
}

const initialStore = { 
  entry: 'client',
  output: 'build/bundle.js',
  loaders: ['babel-preset-react', 'babel-preset-env'],
  plugins: [],
  libraries: []
};

render(<Agent store={initialStore}><App /></Agent>, document.querySelector('#root'));