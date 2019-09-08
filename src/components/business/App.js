import React, { Component } from 'react';
import { withXML } from "../contexts/XML";
import Students from './Students';
import './App.css';

export class App extends Component {
  state = {
    xml: {},
    output: [],
    formError: null
  };

  handleSubmit = event => {
    event.preventDefault();
    let file = this.state.xml;
    if (file.name.slice(-3) !== 'xml') {
      this.setState({ formError: new Error('Please choose XML file') });
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = evt => {
      const readerData = evt.target.result;
      const parser = new DOMParser();
      const xml = parser.parseFromString(readerData, 'text/xml');
      const output = xml.querySelector('school');
      // console.log(output.children[1].children);
      this.setState({ output });
      this.props.updateStudents(Array.from(output.children[1].children));
    };
  };

  handleChange = event => {
    this.setState({
      xml: event.target.files[0],
      formError: null
    })
  };

  render() {
    return (
      <div className="App">
        <h1>Parsing school archiv</h1>
        <form onSubmit={this.handleSubmit} id='form1'>
          <input type="file" name="file" onChange={this.handleChange}/>
          <button form='form1'>parse XML file</button>
          {this.state.formError && <p style={{color: 'red', fontSize: '24px', fontWeight: 'bold'}}>{this.state.formError.message}</p>}
        </form>
        <p>&nbsp;</p>

        <Students/>
      </div>
    );
  }
}

export default withXML(App);
