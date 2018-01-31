import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';
import Nav from './components/Nav';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';
import Generation from './components/Generation';
import { get } from 'react-agent';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Nav />
        <div id='mid'>
          <ConfigContainer />
          <Generation />
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