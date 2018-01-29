import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';
import Nav from './components/Nav';
import Pane from './components/Pane';
import Footer from './components/Footer';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Nav />
        <Pane />
        <Footer />
        <ConfigContainer />
      </div>
    );
  }
}

render(<Agent><App /></Agent>, document.querySelector('#root'));