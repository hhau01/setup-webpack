import React, { Component } from 'react';

class Menu extends Component {

  renderConfigs() {
    const configs = ['react', 'react-css', 'typescript'];
    return configs.map((config, i) => {
      return <div className='configItem' key={i}>{config}</div>
    });
  }

  render() {
    return (
      <div id='menu'>
        {this.renderConfigs()}
      </div>
    );
  }
}

export default Menu;
