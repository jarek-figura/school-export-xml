import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import GradeHeader from './GradeHeader';
import GradeStudents from './GradeStudents';
import PresencesHeader from './PresencesHeader';
import PresencesData from './PresencesData';
import GradeData from './GradeData';
import * as L from 'list';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    const subject = this.props.subject;

    let studentGradeData;
    let studentPresence;
    let presenceData;
    let grades;

    if (!this.props.showStudentPresences) {
      if (!subject.querySelector('grades').innerHTML.length)
        return null;
      const grade = subject.querySelector('columns');
      grades = grade && L.from(JSON.parse(grade.innerHTML));
      studentGradeData = subject.querySelector('students');
      studentGradeData = grade && L.from(JSON.parse(studentGradeData.innerHTML));
    } else {
      let presence = subject.querySelector('presences').querySelector('presence');
      if (!presence)
        return null;
      presenceData = presence.querySelector('data').innerHTML;
      presenceData = parsePresence(presenceData);
      if (presenceData.length <= 2)
        return null;
      presenceData = JSON.parse(presenceData);
      studentPresence = JSON.parse(presence.querySelector('students').innerHTML);
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
                this.props.showStudentPresences
                  ? studentPresence && studentPresence.map(
                      studentId => (
                        clickedId === null || studentId.toString() === clickedId
                          ? <TableRow key={studentId}>
                              {
                                <Fragment>
                                  <GradeStudents studentId={studentId} clickedIdFromGrade={clickedId} />
                                  <PresencesData presenceData={presenceData} studentId={studentId} presencesTypesFromGrade={this.props.presencesTypes} />
                                </Fragment>
                              }
                            </TableRow>
                          : null
                      )
                    )
                  : L.map(
                      student => (
                        clickedId === null || student.student_id.toString() === clickedId
                          ? <TableRow key={student.student_id}>
                            {
                              <Fragment>
                                <GradeStudents studentId={student.student_id} clickedIdFromGrade={clickedId} />
                                <GradeData gradesFromGrade={grades} student={student} />
                              </Fragment>
                            }
                            </TableRow>
                          : null
                      ),
                      studentGradeData
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