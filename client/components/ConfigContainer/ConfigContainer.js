import React, { Component } from 'react';
import { get, set } from 'react-agent';

class ConfigContainer extends Component {

  loaderSelected(event) {
    const loader = event.target.value;
    let loaders = get('loaders');
    if (!loaders.includes(loader)) {
      if (loader === 'less-loader' || loader === 'sass-loader') {
        loaders = loaders.filter(l => (l !== 'css-loader' && l !== 'style-loader'));
        set({ loaders: [...loaders, loader, 'css-loader', 'style-loader'] });
      } else if (loader === 'css-loader') {
        loaders = loaders.filter(l => (l !== 'css-loader' && l !== 'style-loader'));
        set({ loaders: [...loaders, loader, 'style-loader'] });
      } else set({ loaders: [...loaders, loader] });
      event.target.selectedIndex = 0;
    } else {
      event.target.selectedIndex = 0;
    }
  }
  
  pluginSelected(event) {
    const plugins = get('plugins');
    if (!plugins.includes(event.target.value)) {
      set({ plugins: [...plugins, event.target.value] });
      event.target.selectedIndex = 0;
    } else {
      event.target.selectedIndex = 0;
    }
  }

  loaderDeleted(index, loader) {
    let loaders = get('loaders');
    if (loader === 'css-loader') {
      const lessIndex = loaders.indexOf('less-loader');
      if (lessIndex !== -1) {
        loaders = loaders.slice(0, lessIndex).concat(loaders.slice(lessIndex + 1));
        index = loaders.indexOf('css-loader');
      }
      const sassIndex = loaders.indexOf('sass-loader');
      if (sassIndex !== -1) {
        loaders = loaders.slice(0, sassIndex).concat(loaders.slice(sassIndex + 1));
        index = loaders.indexOf('css-loader');
      }
      const styleIndex = loaders.indexOf('style-loader');
      loaders = loaders.slice(0, styleIndex).concat(loaders.slice(styleIndex + 1));
      index = loaders.indexOf('css-loader');
    }
    set({ loaders: loaders.slice(0, index).concat(loaders.slice(index + 1)) });
  }

  pluginDeleted(index) {
    const plugins = get('plugins');
    set({ plugins: plugins.slice(0, index).concat(plugins.slice(index + 1)) });
  }

  renderLoaders() {
    return get('loaders').map((loader, i) => {
      if (loader !== 'style-loader') {
        return (
          <div className='loader' key={i}>
            <div>
              {loader}
            </div>
            <div>
              <i onClick={() => this.loaderDeleted(i, loader)} className='fa fa-minus-circle' aria-hidden='true'></i>
            </div>
          </div>
        );
      }
    });
  }

  renderPlugins() {
    return get('plugins').map((plugin, i) => {
      return (
        <div className='plugin' key={i}>
          <div>
            {plugin}
          </div>
          <div>
            <i onClick={() => this.pluginDeleted(i)} className='fa fa-minus-circle' aria-hidden='true'></i>
          </div>
        </div>
      );
    });
  }

  librarySelected(event) {
    const libraries = get('libraries');
    if (!libraries.includes(event.target.value)) {
      set({ libraries: [...libraries, event.target.value] });
      event.target.selectedIndex = 0;
    } else {
      event.target.selectedIndex = 0;
    }
  }

  libraryDeleted(index) {
    const libraries = get('libraries');
    set({ libraries: libraries.slice(0, index).concat(libraries.slice(index + 1)) });
  }

  renderLibraries() {
    return get('libraries').map((library, i) => {
      return (
        <div className='library' key={i}>
          <div>
            {library}
          </div>
          <div>
            <i onClick={() => this.libraryDeleted(i)} className='fa fa-minus-circle' aria-hidden='true'></i>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div id='config-container'>
        <h2>Webpack Configuration</h2>
        <br />

        <span className='label'>Entry</span><br />
        <input value={get('entry')} name='entry' onChange={e => set({ entry: e.target.value })} type='text' />
        <br /><br />

        <span className='label'>Output</span><br />
        <input value={get('output')} name='output' onChange={e => set({ output: e.target.value })} type='text' />
        <br /><br />

        <span className='label'>Loaders</span><br />
        {this.renderLoaders()}
        <select name='loaders' onChange={this.loaderSelected}>
          <option value='---SELECT---'>---SELECT---</option>
          <option value='babel-preset-env'>babel-preset-env</option>
          <option value='babel-preset-flow'>babel-preset-flow</option>
          <option value='babel-preset-react'>babel-preset-react</option>
          <option value='babel-preset-stage-0'>babel-preset-stage-0</option>
          <option value='css-loader'>css-loader</option>
          {/* <option value='file-loader'>file-loader</option> */}
          {/* <option value='html-loader'>html-loader</option> */}
          {/* <option value='img-loader'>img-loader</option> */}
          <option value='json-loader'>json-loader</option>
          <option value='less-loader'>less-loader</option>
          {/* <option value='mocha-loader'>mocha-loader</option> */}
          {/* <option value='postcss-loader'>postcss-loader</option> */}
          {/* <option value='raw-loader'>raw-loader</option> */}
          <option value='sass-loader'>sass-loader</option>
          <option value='svg-url-loader'>svg-url-loader</option>
          <option value='ts-loader'>ts-loader</option>
          {/* <option value='url-loader'>url-loader</option> */}
        </select>
        <br /><br />
        <span className='label'>Libraries</span><br />
        {this.renderLibraries()}
        <select name='libraries' onChange={this.librarySelected}>
          <option value='---SELECT---'>---SELECT---</option>
          <option value='dotenv-webpack'>dotenv-webpack</option>
          <option value='webpack-stream'>webpack-stream</option>
          <option value='webpack-blocks'>webpack-blocks</option>
        </select>
        <br /><br />
        <span className='label'>Plugins</span><br />
        {this.renderPlugins()}
        <select name='plugins' onChange={this.pluginSelected}>
          <option value='---SELECT---'>---SELECT---</option>
          <option value='extract-text-webpack-plugin'>extract-text-webpack-plugin</option>
          <option value='offline-plugin'>offline-plugin</option>
          <option value='rewire-webpack'>rewire-webpack</option>
          <option value='copy-webpack-plugin'>copy-webpack-plugin</option>
          <option value='serverless-webpack'>serverless-webpack</option>
          <option value='svg-sprite-webpack-plugin'>offline-plugin</option>
        </select>
        <br /><br />
      </div>
    );
  }
}

export default ConfigContainer;