import React, {Component} from 'react';
import { render } from 'react-dom';
import { Agent } from 'react-agent';
import './style.css';

class App extends Component {
  render() {
    return (
      <div>
        henry
      </div>
    );
  }
}

render(<Agent><App /></Agent>, document.querySelector('#root'));