import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import StudentSearch from './StudentSearch';
import filterStudents from './StudentsFilter';
import './Students.css';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// TODO: OK - Wyszukiwanie ucznia po imieniu i nazwisku

export class Students extends Component {

  handleClick = (id) => { this.props.handleStudentClick(id) };
  handleSortUserName = () => { };
  handleSortNameSurname = () => { };

  render() {
    const clickedId = this.props.studentClickedId;
    let colorName = {};
    if (clickedId) {
      colorName[clickedId] = 'secondary';
    } else {
      colorName[clickedId] = 'initial';
    }

    const students = filterStudents.apply(this);

    let adres;
    let personalData;
    return (
      <div className='students'>
        <Card elevation={0} style={{ border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Box fontSize='h5.fontSize'>Students found: {students.length}</Box>
            <Box fontSize='h6.fontSize' mt={2} mb={2}>Search students by:</Box>
            <div className='student-search'>
              <StudentSearch />
            </div>
          </CardContent>
        </Card>
        <Card elevation={0} style={{ border: '1px solid #e0e0e0', marginTop: '9px' }}>
          <Table className='student-data' size='small'>
            <TableHead style={{ backgroundColor: '#eee' }}>
              {this.props.students.length !== 0 &&
                <TableRow>
                  <TableCell onClick={this.handleSortUserName}><Typography>Username</Typography></TableCell>
                  <TableCell onClick={this.handleSortNameSurname}><Typography>Name Surname</Typography></TableCell>
                </TableRow>
              }
            </TableHead>
            <TableBody>
              {
                students.map(
                  (student, idx) => (
                    // eslint-disable-next-line
                    personalData = student.querySelector('personal_data').innerHTML,
                    adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
                    <TableRow
                      key={idx}
                      onClick={() => this.handleClick(student.firstChild.innerHTML)}
                      className='student'
                    >
                      <TableCell>
                        <Typography color={`${student.querySelector('id').innerHTML === clickedId ? colorName[clickedId] : 'initial'}`}>
                          {student.querySelector('username').innerHTML}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color={`${student.querySelector('id').innerHTML === clickedId ? colorName[clickedId] : 'initial'}`}>
                          {adres && 'name' in adres && adres.name} {adres && 'surname' in adres && adres.surname}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                )
              }
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }
}

export default withXML(Students);