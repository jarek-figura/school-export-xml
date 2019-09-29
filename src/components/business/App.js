import React, { Component } from 'react';
import { withXML } from "../contexts/XML";
import Students from './Students';
import StudentActivity from './StudentActivity';
import './App.css';

export class App extends Component {
  state = {
    xml: {},
    output: [],
    formError: null
  };

  handleChange = event => {
    let file = event.target.files[0];
    if (file.name.slice(-3) !== 'xml') {
      this.setState({ formError: new Error('Please choose XML file') });
      return;
    }
    this.props.updateParsingTxt('Parsing XML ...');
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = evt => {
      const readerData = evt.target.result;
      const parser = new DOMParser();
      const xml = parser.parseFromString(readerData, 'text/xml');
      const school = xml.querySelector('school');
      this.props.updateSchool(school);
    };

    this.setState({
      xml: event.target.files[0],
      formError: null
    })
  };

  render() {
    let yearStart, yearEnd;
    if (this.props.year) {
      yearStart = new Date(this.props.year.querySelector('start').innerHTML);
      yearEnd = new Date(this.props.year.querySelector('end').innerHTML);
    }

    return (
      <table>
        <tbody>
          <tr>
            <td style={{verticalAlign: 'top'}}>
              <div className='App'>
                <form id='form1'>
                  <h2>Parsing school archiv</h2>
                  <input type='file' name='file' onChange={this.handleChange}/>
                  {this.state.formError && <p style={{color: 'red', fontSize: '24px', fontWeight: 'bold'}}>{this.state.formError.message}</p>}
                  <h3>Year: {this.props.year && `${yearStart.toLocaleDateString('pl-PL')} - ${yearEnd.toLocaleDateString('pl-PL')}`}</h3>
                  <p style={{ color: 'red' }}>{this.props.parsingTxt}</p>
                </form>
              </div>
              <Students/>
            </td>
            <td style={{verticalAlign: 'top'}}>
              <StudentActivity />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default withXML(App);
