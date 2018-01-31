import React, { Component } from 'react';
import { get } from 'react-agent';

class Generation extends Component {

  renderNpm() {
    const loaders = get('loaders');
    const libraries = get('libraries');
    if (loaders.length + libraries.length > 0) {
      let string = 'npm install --save-dev';
      loaders.forEach(loader => {
        if (loader.includes('babel') && !string.includes(' babel-loader babel-core')) {
          string += ' babel-loader babel-core';
        }
        string += ` ${loader}`
      })
      libraries.forEach(library => {
        string += ` ${library}`
      });
      return (
        <div>
          <h2>npm install</h2>
          <pre id='npm'>{string}</pre>
        </div>
      );
    }
  }

  renderResolve() {
    const loaders = get('loaders');
    let babel = false, ts = false;
    loaders.forEach(loader => {
      if (loader.includes('babel')) babel = true;
      else if (loader === 'ts-loader')  ts = true;
    });
    let extensions = ['.js'];
    if (babel) extensions = extensions.concat(['.jsx']);
    if (ts) extensions = extensions.concat(['.ts', '.tsx']);
    extensions = extensions.map(e => `'${e}'`);
    if (babel || ts) {
      return (
`  resolve: {
    extensions: [${extensions.join(', ')}]
  },
`);
    }
  }

  renderModules() {
    const loaders = get('loaders');
    
    if (loaders.length > 0 ) {
      return (
`  modules: {
    rules: [
      ${renderLoaders()}
    ]
  },
`);
    }

    function renderLoaders() {
      let babel = false, style = false, lessOrSass = false;
      loaders.forEach(loader => {
        if (loader.includes('babel')) babel = true;
        if (loader === 'style-loader') style = true;
        if (loader === 'less-loader') lessOrSass = true;
        if (loader === 'sass-loader') lessOrSass = true;
      });
      let filteredLoaders = [...loaders];
      if (babel) {
        filteredLoaders = filteredLoaders.filter(l => !l.includes('babel'));
        filteredLoaders.unshift('babel');
      }
      if (style) {
        filteredLoaders = filteredLoaders.filter(l => l !== 'style-loader');
      }
      if (lessOrSass) {
        filteredLoaders = filteredLoaders.filter(l => l !== 'css-loader');
      }
      return filteredLoaders.map((loader, i) => {
        if (loader === 'babel') {
          return (
        `{
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/${loaders.filter(l => l.includes('babel')).join('/')}']
          }
        }
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        } else if (loader === 'json-loader') {
          return (
        `${i === 0 ? '{' : '      {'}
        test: /\.json$/,
        use: 'json-loader'
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        } else if (loader === 'svg-url-loader') {
          return (
        `${i === 0 ? '{' : '      {'}
        test: /\.svg/,
        use: 'svg-url-loader'
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        } else if (loader === 'ts-loader') {
          return (
        `${i === 0 ? '{' : '      {'}
        test: /\.tsx?$/,
        use: 'ts-loader'
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        } else if (loader === 'css-loader') {
          return (
        `${i === 0 ? '{' : '      {'}
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        } else if (loader === 'sass-loader') {
          return (
        `${i === 0 ? '{' : '      {'}
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', '${loader}']
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        } else if (loader === 'less-loader') {
          return (
        `${i === 0 ? '{' : '      {'}
        test: /\.less$/,
        use: ['style-loader', 'css-loader', '${loader}']
      },${filteredLoaders.length - 1 !== i ? '\n' : ''}`);
        }
      }).join('');
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
          {this.renderModules()}
          {this.renderResolve()}
          {`};`}<br />
        </pre><br />
        {this.renderNpm()}
      </div>
    );
  }
}

export default Generation;
