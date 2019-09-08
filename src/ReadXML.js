import React, { Component } from 'react';

export class ReadXML extends Component {
  render() {
    return (
      <div className="ReadXML">
        <p>wybór pliku XML</p>
        <input type="file" name="file" onChange={this.props.handleChange}/>
        <p>&nbsp;</p>
      </div>
    );
  }
}

export default ReadXML;
