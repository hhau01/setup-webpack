import React, { Component } from 'react';

class Pane extends Component {
  render() {
    return (
      <div id='pane'>
        <button onClick={this.props.generate}>{this.props.button}</button>
        <button>Save</button>
        <div id='more-info'>
          More Info: blah blah blah blah blah blah blah blah<br /><br />

          More Info: blah blah blah blah blah blah blah blah<br /><br />

          More Info: blah blah blah blah blah blah blah blah<br /><br />

          More Info: blah blah blah blah blah blah blah blah<br /><br />

          More Info: blah blah blah blah blah blah blah blah<br /><br />

          More Info: blah blah blah blah blah blah blah blah<br /><br />
        </div>
      </div>
    );
  }
}

export default Pane;