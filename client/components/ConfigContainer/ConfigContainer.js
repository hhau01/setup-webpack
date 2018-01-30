import React, { Component } from 'react';
import { get, set } from 'react-agent';

class ConfigContainer extends Component {

  render() {
    return (
      <div id='config-container'>
        <h2>Customize Your Webpack Configuration</h2>
        <br />

        <span className='label'>Entry</span><br />
        <input value={get('entry')} name='entry' onChange={e => set({ entry: e.target.value })} type='text' />
        <br /><br />

        <span className='label'>Output</span><br />
        <input value={get('output')} name='output' onChange={e => set({ output: e.target.value })} type='text' />
        <br /><br />

        {/* <span className='label'>Loaders</span><br /><br />
        <div className='checkbox'>
          <input value='babel-preset-env' style={{ width: '70%', height: '30px' }} type='checkbox' /> 
          babel-preset-env
        </div>
        <div className='checkbox'>
          <input value='babel-preset-react' style={{ width: '70%', height: '30px' }} type='checkbox' />
          babel-preset-react
        </div>
        <div className='checkbox'>
          <input value='css-loader' style={{ width: '70%', height: '30px' }} type='checkbox' />
          css-loader
        </div>
        <div className='checkbox'>
          <input value='style-loader' style={{ width: '70%', height: '30px' }} type='checkbox' />
          style-loader
        </div>
        <div className='checkbox'>
          <input value='style-loader' style={{ width: '70%', height: '30px' }} type='checkbox' />
          image-loader
        </div>
        <div className='checkbox'>
          <input value='style-loader' style={{ width: '70%', height: '30px' }} type='checkbox' />
          file-loader
        </div> */}

        <br /><br />
      </div>
    );
  }
}

export default ConfigContainer;