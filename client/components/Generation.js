import React, { Component } from 'react';
import { get } from 'react-agent';

class Generation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      configInput: ''
    };
  }

  handleConfigInput(event) {
    this.setState({ configInput: event.target.value });
  }

  handleConfigSave() {
    if (this.props.checkUser()) {
      if (this.state.configInput.length !== 0) {
        const configName = this.state.configInput;
        const config = get();
        const options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ configName, config }),
          credentials: 'include'
        };
        fetch('/configs', options).then(res => res.json()).then(data => {
          this.props.fetchConfigs();
        });
        this.setState({ configInput: '' });
      } else {
        alert(`Config name can't be empty - Henry`);
      }
    } else {
      alert('Must be logged in. - Henry');
    }
  }

  renderNpm() {
    const loaders = get('loaders');
    const plugins = get('plugins');
    const libraries = get('libraries');
    const modules = loaders.concat(plugins, libraries);
    if (modules.length > 0) {
      let string = 'npm install --save-dev';
      modules.forEach(module => {
        if (module.includes('babel') && !string.includes(' babel-loader babel-core')) {
          string += ' babel-loader babel-core';
        }
        string += ` ${module}`
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
`  module: {
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
            presets: [${loaders.filter(l => l.includes('babel')).map(l => `'${l}'`).join(', ')}]
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

  renderPlugins() {
    const plugins = get('plugins');
    const libraries = get('libraries');
    const selected = [...plugins, ...libraries];

    if (selected.length > 0) {
      return (
      `  plugins: [
    ${renderPluginsHelper()}
  ],
`
  );
    }
    function renderPluginsHelper() {
      return selected.map((plugin, i) => {
        if (plugin === 'dotenv-webpack') {
          return (
            `${i !== 0 ? '    ' : ''}new Dotenv()${selected.length - 1 !== i ? ',\n' : ''}`);
        } else if (plugin === 'extract-text-webpack-plugin') {
          return (
            `${i !== 0 ? '    ' : ''}new ExtractTextPlugin('styles.css')${selected.length - 1 !== i ? ',\n' : ''}`);
        } else if (plugin === 'offline-plugin') {
          return (
            `${i !== 0 ? '    ' : ''}new OfflinePlugin()${selected.length - 1 !== i ? ',\n' : ''}`);
        } else if (plugin === 'rewire-webpack') {
          return (
            `${i !== 0 ? '    ' : ''}new RewirePlugin()${selected.length - 1 !== i ? ',\n' : ''}`);
        } else if (plugin === 'uglifyjs-webpack-plugin') {
          return (
            `${i !== 0 ? '    ' : ''}new UglifyJsPlugin()${selected.length - 1 !== i ? ',\n' : ''}`);
        } else if (plugin === 'webpack-dashboard') {
          return (
            `${i !== 0 ? '    ' : ''}new DashboardPlugin()${selected.length - 1 !== i ? ',\n' : ''}`);
        }
      }).join('');
    }    
  }
  
  renderRequire() {
    const plugins = get('plugins');
    const libraries = get('libraries');
    const selected = [...plugins, ...libraries];
    return selected.map((plugin, i) => {
      if (plugin === 'dotenv-webpack') {
        return (
          `const Dotenv = require('dotenv-webpack');${selected.length - 1 !== i ? '\n' : ''}`);
      } else if (plugin === 'extract-text-webpack-plugin') {
        return (
          `const ExtractTextPlugin = require('extract-text-webpack-plugin');${selected.length - 1 !== i ? '\n' : ''}`);
      } else if (plugin === 'offline-plugin') {
        return (
          `const OfflinePlugin = require('offline-plugin');${selected.length - 1 !== i ? '\n' : ''}`);
      } else if (plugin === 'rewire-webpack') {
        return (
          `const RewirePlugin = require('rewire-webpack');${selected.length - 1 !== i ? '\n' : ''}`);
      } else if (plugin === 'uglifyjs-webpack-plugin') {
        return (
          `const UglifyJsPlugin = require('uglifyjs-webpack-plugin');${selected.length - 1 !== i ? '\n' : ''}`);
      } else if (plugin === 'webpack-dashboard') {
        return (
          `const DashboardPlugin = require('webpack-dashboard/plugin');${selected.length - 1 !== i ? '\n' : ''}`);
      }
    }).concat(`\n\n`).join('');
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
        <div id='generated-code'>
          <h2>Generated Code</h2>
          <div>
            <input value={this.state.configInput} onChange={this.handleConfigInput.bind(this)} type='text' placeholder='config name'></input>
            <button onClick={this.handleConfigSave.bind(this)}>Save</button>
          </div>
        </div>
        <pre>
          {`const path = require('path');`}<br />
          {this.renderRequire()}
          {`module.exports = {`}<br />
          {`  entry: path.resolve(__dirname, '${entries}'),`}<br />
          {`  output: {`}<br />
          {`    path: path.resolve(__dirname, '${outputs}'),`}<br />
          {`    filename: '${filename}'`}<br />
          {`  },`}<br />
          {this.renderModules()}
          {this.renderResolve()}
          {this.renderPlugins()}
          {`};`}<br />
        </pre><br />
        {this.renderNpm()}
      </div>
    );
  }
}

export default Generation;