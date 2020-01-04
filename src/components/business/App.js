import React, { PureComponent } from 'react';
import { withXML } from "../contexts/XML";
import Students from './Students';
import StudentActivity from './StudentActivity';
import './App.css';

import Button from '@material-ui/core/Button';
import Folder from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

var parser = require('fast-xml-parser');

export class App extends PureComponent {
  state = {
    formError: null,
    fileName: null
  };

  handleChange = event => {
    let file = event.target.files[0];
    if (!file || file.name.slice(-3) !== 'xml') {
      this.setState({ formError: new Error('Wybierz plik XML') });
      return;
    }
    this.setState({ fileName: file.name })

    this.props.resetSchool();
    this.props.updateParsingTxt('Parsowanie pliku XML...');
    this.props.handleShowStudentPresences(false);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = evt => {
      const readerData = evt.target.result;
      var jsonObj = parser.parse(readerData);
      jsonObj = jsonObj.root.school;
      delete jsonObj.lesson_plans;
      const school = jsonObj;
      // const year = school.years.year;
      // const semesters = year.semesters;
      // console.log(semesters);
      // const students = school.students;
      // console.log(students);
      // const teachers = school.teachers;
      // console.log(teachers);
      // const presencesTypes = school.presences_types;
      // console.log(presencesTypes);
      // const gradeColumnTypes = school.grade_column_types;
      // console.log(gradeColumnTypes);
      this.props.updateSchool(school);
    };
    this.setState({ formError: null });
  };

  render() {

    let yearStart, yearEnd;
    if (this.props.year) {
      yearStart = new Date(this.props.year.start);
      yearEnd = new Date(this.props.year.end);
    }

    return (
      <table>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <Card className='App' style={{ backgroundColor: '#ffffee', zIndex: 10 }}>
                <CardContent>
                  <Box fontSize='h5.fontSize' fontWeight='fontWeightBold' mb={1.4}>Archiwum Szkoły</Box>
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
                      <Folder />&nbsp;Wybierz XML
                      </Button> <Box style={{ display: 'inline-block' }} ml={1}><Typography color='primary'>{this.state.fileName}</Typography></Box>
                  </label>
                  {this.state.formError && <Typography color='secondary'>{this.state.formError.message}</Typography>}
                  <Box fontSize={18} mt={2}>
                    Rok szkolny: {this.props.year && `${yearStart.toLocaleDateString('pl-PL')} - ${yearEnd.toLocaleDateString('pl-PL')}`}
                  </Box>
                  <Typography color='secondary'>{this.props.parsingTxt}</Typography>
                </CardContent>
              </Card>
              {this.props.year && <Students />}
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
