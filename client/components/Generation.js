import React, { Component } from 'react';
import { get } from 'react-agent';

class Generation extends Component {

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    let entries = get('entry').split('/').map((e, i, a) => {
      if (i !== 0 && i !== a.length - 1) return `'` + e + `',`;
      else if (i === 0 && a.length !== 1) return e + `',`;
      else if (a.length !== 1) return `'` + e;
      else return e;
    }).join(' ');

    let outputs = get('output').split('/');
    const filename = outputs.pop();
    outputs = outputs.map((e, i, a) => {
      if (i !== 0 && i !== outputs.length - 1) return `'` + e + `',`;
      else if (i === 0 && outputs.length !== 1) return e + `',`;
      else if (outputs.length !== 1) return `'` + e;
      else return e;
    }).join(' ');

    return (
      <div id='generation'>
        <h2>Your Webpack Config</h2>
        <pre className='prettyprint lang-js'>
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