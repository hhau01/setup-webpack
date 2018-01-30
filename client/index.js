import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';
import Nav from './components/Nav';
import Pane from './components/Pane';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';
import Generation from './components/Generation';
import { get } from 'react-agent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generate: false,
      button: 'Generate'
    }
  }

  render() {
    return (
      <div id='app'>
        <Nav />
        <div id='mid'>
          {this.state.generate ? <Generation /> : <ConfigContainer /> }
          <Pane button={this.state.button} generate={this.generate.bind(this)} />
        </div>
      </div>
    );
  }

  generate() {
    this.setState(prevState => ({ generate: !prevState.generate }));
    this.setState(prevState => {
      if (prevState.button === 'Generate') return ({ button: 'Config' });
      else return ({ button: 'Generate' });
    });
  }
}

const initialStore = { 
  entry: 'client/client/client/client',
  output: 'build/build/build/build/bundle.js'
};

render(<Agent store={initialStore}><App /></Agent>, document.querySelector('#root'));