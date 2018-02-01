import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';
import Nav from './components/Nav';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';
import Generation from './components/Generation';
import { get } from 'react-agent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  
  setUser(user) {
    this.setState({ user });
  }

  checkUser() {
    if (this.state.user.username) return true;
    return false;
  }

  render() {
    return (
      <div id='app'>
        <Nav setUser={this.setUser.bind(this)} user={this.state.user} />
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