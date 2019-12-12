import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import GradeHeader from './GradeHeader';
import GradeStudents from './GradeStudents';
import PresencesHeader from './PresencesHeader';
import PresencesData from './PresencesData';
import GradeData from './GradeData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// TODO: dodać `studentPresencesData` - inna lista studentów, niz dla `studentGradeData`
// TODO: albo raczej zawsze wyświetlać listę studentów w klasie

const parsePresence = data => {
  data = data && data.length && data.replace(/u'/g, '\'');
  return data && data.length && data.replace(/'/g, '"');
};

export class Grade extends PureComponent {

  componentDidMount() {
    this.props.updateParsingTxt('');
  }

  render() {
    const clickedId = this.props.studentClickedId;
    const grade = this.props.subject.querySelector('columns');
    const grades = grade && JSON.parse(grade.innerHTML);
    let studentGradeData = this.props.subject.querySelector('students');
    studentGradeData = grade && JSON.parse(studentGradeData.innerHTML);

    let presenceData;
    let presence = this.props.subject.querySelector('presences').querySelector('presence');
    if (presence) {
      presenceData = presence.querySelector('data').innerHTML;
      presenceData = parsePresence(presenceData);
      if (presenceData.length > 2) {
        presenceData = JSON.parse(presenceData);
      }
    }
    
    return (
      <Fragment>
        <Paper elevation={0} style={{ border: '1px solid #e0e0e0', display: 'inline-block' }}>
          <Table className='grades-table' size='small' style={{ width: 'auto' }}>
            <TableHead>
              <TableRow style={{ color: '#444' }}>
                <TableCell style={{ backgroundColor: '#eeffff' }}><Box fontSize={16}>Uczeń</Box></TableCell>
                <TableCell style={{ backgroundColor: '#eeffff', borderRight: '1px solid #e0e0e0' }}><Box fontSize={16}>Nazwa użytk.</Box></TableCell>
                {
                  this.props.showStudentPresences
                    ? <PresencesHeader presenceData={presenceData} lessonsHours={this.props.lessonsHours} />
                    : <GradeHeader gradesFromGrade={grades} />
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                studentGradeData && studentGradeData.map(
                  student => (
                    (clickedId === null) || (student.grades.length && student.student_id.toString() === clickedId)
                      ?
                      <TableRow key={student.student_id}>
                        {
                          this.props.showStudentPresences
                            ? <Fragment>
                                <GradeStudents student={student} clickedIdFromGrade={clickedId} />
                                <PresencesData presenceData={presenceData} student={student} presencesTypesFromGrade={this.props.presencesTypes} />
                              </Fragment>
                            : <Fragment>
                                <GradeStudents student={student} clickedIdFromGrade={clickedId} />
                                <GradeData gradesFromGrade={grades} student={student} />
                              </Fragment>
                        }
                      </TableRow>
                    : null
                  )
                )
              }
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    )
  }
}

export default withXML(Grade);