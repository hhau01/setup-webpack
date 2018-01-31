import React, { Component } from 'react';
import { get } from 'react-agent';

class Generation extends Component {

  renderNpm() {
    const loaders = get('loaders');
    if (loaders.length > 0) {
      let string = 'npm install --save-dev';
      loaders.forEach(loader => {
        if (loader.includes('babel') && !string.includes(' babel-loader babel-core')) {
          string += ' babel-loader babel-core';
        }
        string += ` ${loader}`
      })
      return (
        <div>
          <h2>npm install</h2>
          <pre id='npm'>{string}</pre>
        </div>
      );
    }
  }

  render() {
    let entries = get('entry').split('/').filter(e => e !== '.' && e.length > 0)
    .map((e, i, a) => {
      if (i !== 0 && i !== a.length - 1) return `'` + e + `',`;
      else if (i === 0 && a.length !== 1) return e + `',`;
      else if (a.length !== 1) return `'` + e;
      else return e;
    }).filter(e => e.length !== 0).join(' ');

    let outputs = get('output').split('/').filter(o => o !== '.' && o.length > 0);
    const filename = outputs.pop();
    outputs = outputs.map((o, i, a) => {
      if (i !== 0 && i !== outputs.length - 1) return `'` + o + `',`;
      else if (i === 0 && outputs.length !== 1) return o + `',`;
      else if (outputs.length !== 1) return `'` + o;
      else return o;
    }).join(' ');

    return (
      <div id='generation'>
        <h2>Generated Code</h2>
        <pre>
          {`const path = require('path');`}<br /><br />
          {`module.exports = {`}<br />
          {`  entry: path.resolve(__dirname, '${entries}'),`}<br />
          {`  output: {`}<br />
          {`    path: path.resolve(__dirname, '${outputs}'),`}<br />
          {`    filename: '${filename}'`}<br />
          {`  },`}<br />
          {`};`}<br />
        </pre><br />
        {this.renderNpm()}
      </div>
    );
  }
}

export default Generation;
