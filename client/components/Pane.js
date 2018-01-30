import React, { Component } from 'react';

class Pane extends Component {
  render() {
    return (
      <div id='pane'>
        <div id='export'>
          <button>Save</button><button>Export</button>
        </div>
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