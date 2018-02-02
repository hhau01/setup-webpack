import React, { Component } from 'react';
import { set } from 'react-agent';

class Menu extends Component {

  handleClick(config) {
    fetch(`/configs/${config.id}`).then(res => res.json()).then(data => set(data));
    this.props.handleMenu();
  }

  renderConfigs() {
    return this.props.configs.map((config, i) => {
      return <div onClick={() => this.handleClick(config)} className='configItem' key={i}>{config.name}</div>
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
