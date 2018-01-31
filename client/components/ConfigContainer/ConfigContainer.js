import React, { Component } from 'react';
import { get, set } from 'react-agent';

class ConfigContainer extends Component {

  loaderSelected(event) {
    const loaders = get('loaders');
    if (!loaders.includes(event.target.value)) {
      set({ loaders: [...loaders, event.target.value] });
      event.target.selectedIndex = 0;
    } else {
      event.target.selectedIndex = 0;
    }
  }

  loaderDeleted(index) {
    const loaders = get('loaders');
    set({ loaders: loaders.slice(0, index).concat(loaders.slice(index + 1)) });
  }

  renderLoaders() {
    return get('loaders').map((loader, i) => {
      return (
        <div className='loader' key={i}>
          <div>
            {loader}
          </div>
          <div>
            <i onClick={() => this.loaderDeleted(i)} className='fa fa-minus-circle' aria-hidden='true'></i>
          </div>
        </div>
      );
    });
  }

  librarySelected(event) {
    const loaders = get('libraries');
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
    return get('libraries').map((loader, i) => {
      return (
        <div className='library' key={i}>
          {library}
        </div>
        <div>
          <i onClick={() => this.libraryDeleted(i)} className='fa fa-minus-circle' aria-hidden='true'></i>
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
          <option value='file-loader'>file-loader</option>
          <option value='html-loader'>html-loader</option>
          <option value='img-loader'>img-loader</option>
          <option value='json-loader'>json-loader</option>
          <option value='less-loader'>less-loader</option>
          <option value='mocha-loader'>mocha-loader</option>
          <option value='postcss-loader'>postcss-loader</option>
          <option value='raw-loader'>raw-loader</option>
          <option value='sass-loader'>sass-loader</option>
          <option value='style-loader'>style-loader</option>
          <option value='svg-url-loader'>svg-url-loader</option>
          <option value='ts-loader'>ts-loader</option>
          <option value='url-loader'>url-loader</option>
        </select>
        <br /><br />
        <span className='label'>Libraries</span><br />
        {this.renderLibraries()}
        <select name='libraries' onChange={this.librarySelected}>
          <option value='---SELECT---'>---SELECT---</option>
          <option value='dotenv-webpack'>dotenv-webpack</option>
          <option value='webpack-stream'>webpack-stream</option>
          <option value='webpack-blocks'>webpack-blocks</option>
          <option value=''></option>
        </select>
      </div>
      
    );
  }
}

export default ConfigContainer;