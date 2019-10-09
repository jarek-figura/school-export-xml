import React, { Component } from 'react';
import { withXML } from "../contexts/XML";
import Students from './Students';
import StudentActivity from './StudentActivity';
import './App.css';

import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export class App extends Component {
  state = { formError: null };

  handleChange = event => {
    let file = event.target.files[0];
    if (!file || file.name.slice(-3) !== 'xml') {
      this.setState({ formError: new Error('Please choose XML file') });
      return;
    }

    this.props.resetSchool();
    this.props.updateParsingTxt('Parsing XML ...');
    this.props.handleShowStudentPresences(false);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = evt => {
      const readerData = evt.target.result;
      const parser = new DOMParser();
      const xml = parser.parseFromString(readerData, 'text/xml');
      const school = xml.querySelector('school');
      this.props.updateSchool(school);
    };
    this.setState({ formError: null })
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
            <td style={{ verticalAlign: 'top' }}>
              <Card className='App'>
                <CardContent>
                  <Typography>
                    <Box fontSize='h5.fontSize' fontWeight='fontWeightBold' mb={1.4}>Parsing school archiv</Box>
                    <input
                      color="primary"
                      type="file"
                      id="icon-button-file"
                      onChange={this.handleChange}
                      hidden
                    />
                    <label htmlFor="icon-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        <AddCircle />&nbsp;Choose XML
                      </Button>
                    </label>
                  </Typography>
                  {this.state.formError && <Typography color='secondary'>{this.state.formError.message}</Typography>}
                  <Box fontSize={18} mt={2}>
                    Year: {this.props.year && `${yearStart.toLocaleDateString('pl-PL')} - ${yearEnd.toLocaleDateString('pl-PL')}`}
                  </Box>
                  <Typography color='secondary'>{this.props.parsingTxt}</Typography>
                </CardContent>
              </Card>
              { this.props.year && <Students /> }
            </td>
            <td style={{ verticalAlign: 'top' }}>
              {this.props.year && <StudentActivity />}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default withXML(App);
