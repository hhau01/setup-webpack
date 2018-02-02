import React, { Component } from 'react';

class Menu extends Component {

  renderConfigs() {
    const configs = ['react', 'react-css', 'typescript'];
    return configs.map((config, i) => {
      return <div className='configItem' key={i}>{config}</div>
    });
  }

  render() {
    const style = this.props.selected ? { transform: 'translateY(0)' } : {};
    return (
      <div id='menu' style={style}>
        {this.renderConfigs()}
      </div>
    );
  }
}

export default Menu;
