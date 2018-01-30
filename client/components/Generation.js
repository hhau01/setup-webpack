import React, { Component } from 'react';
import { get } from 'react-agent';

class Generation extends Component {
  render() {
    let entries = get('entry').split('/').map((e, i, a) => {
      if (i !== a.length - 1) return e + `'`;
      else if (a.length !== 1) return `'` + e;
      else return e;
    }).join(' ');

    let outputs = get('output').split('/');
    const filename = outputs.pop();
    outputs = outputs.map((e, i, a) => {
      if (i !== outputs.length - 1) return e + `'`;
      else if (a.length !== 1) return `'` + e;
      else return e;
    }).join(' ');

    return (
      <div id='generation'>
        <h2>Your Webpack Config</h2>
        <pre>
          {`const path = require('path');`}<br /><br />
          {`module.exports = {`}<br />
          {`  entry: path.resolve(__dirname, '${entries}'),`}<br />
          {`  output: {`}<br />
          {`    path: path.resolve(__dirname, '${outputs}'),`}<br />
          {`    filename: '${filename}'`}<br />
          {`  }`}<br />
          {`};`}<br />
        </pre>
      </div>
    );
  }
}

export default Generation;