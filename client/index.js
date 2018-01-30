import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';
import Nav from './components/Nav';
import Pane from './components/Pane';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Nav />
        <div id='mid'>
          <ConfigContainer />
          <Pane />
        </div>
      </div>
    );
  }
}

render(<Agent><App /></Agent>, document.querySelector('#root'));