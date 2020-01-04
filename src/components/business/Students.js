import React, { PureComponent } from 'react';
import { withXML } from '../contexts/XML';
import filterStudents from './StudentsFilter';
import SearchForm from './SearchForm';
import './Students.css';
import * as L from 'list';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class Students extends PureComponent {

  handleClick = id => { this.props.handleStudentClick(id) };

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
            <Box fontSize='h5.fontSize'>Liczba uczniów: {students.length}</Box>
            <Box fontSize='h6.fontSize' mt={2} mb={2}>Wyszukaj uczniów według:</Box>
            <div className='student-search'>
              <SearchForm
                icon={null}
                width={'84px'}
                label={'Imię'}
                placeholder={'Imię'}
                startAdornment={null}
                updateSearchFunction={this.props.updateSearchName}
              /> <SearchForm
                icon={null}
                width={'120px'}
                label={'Nazwisko'}
                placeholder={'Nazwisko'}
                startAdornment={null}
                updateSearchFunction={this.props.updateSearchSurname}
              /> <SearchForm
                icon={null}
                width={'148px'}
                label={'Nazwa użytk.'}
                placeholder={'Nazwa użytk.'}
                startAdornment={null}
                updateSearchFunction={this.props.updateSearchUser}
              />
            </div>
          </CardContent>
        </Card>
        <Card elevation={0} style={{ border: '1px solid #e0e0e0', marginTop: '9px' }}>
          <Table className='student-data' size='small'>
            <TableHead style={{ backgroundColor: '#eeffff' }}>
              {this.props.students.length !== 0 &&
                <TableRow>
                  <TableCell><Typography>Imię i Nazwisko</Typography></TableCell>
                  <TableCell><Typography>Nazwa użytk.</Typography></TableCell>
                </TableRow>
              }
            </TableHead>
            <TableBody>
              {
                L.map(
                  student => (
                    // eslint-disable-next-line
                    personalData = student.personal_data,
                    adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
                    <TableRow
                      key={student.id}
                      onClick={() => this.handleClick(student.id)}
                      className='student'
                    >
                      <TableCell>
                        <Typography color={`${student.id === clickedId ? colorName[clickedId] : 'initial'}`}>
                          {adres && 'name' in adres && adres.name} {adres && 'surname' in adres && adres.surname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color={`${student.id === clickedId ? colorName[clickedId] : 'initial'}`}>
                          {student.username}
                        </Typography>
                      </TableCell>
                    </TableRow>
                ), students)
              }
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }
}

export default withXML(Students);