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
      menu: false
    };
  }
  
  setUser(user) {
    this.setState({ user });
  }

  checkUser() {
    if (this.state.user.username) return true;
    return false;
  }

  handleMenu() {
    this.setState(prevState => ({ menu: !prevState.menu }));
  }

  fetchConfigs() {
    fetch('/users/configs').then(res => res.json()).then(data => console.log(data));
  }

  render() {
    return (
      <div id='app'>
        <Nav fetchConfigs={this.fetchConfigs.bind(this)} handleMenu={this.handleMenu.bind(this)} setUser={this.setUser.bind(this)} user={this.state.user} />
        <Menu selected={this.state.menu} />
        <div id='mid'>
          <ConfigContainer />
          <Generation checkUser={this.checkUser.bind(this)} />
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