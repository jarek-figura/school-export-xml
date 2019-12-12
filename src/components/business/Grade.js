import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import GradeHeader from './GradeHeader';
import GradeStudents from './GradeStudents';
import PresencesHeader from './PresencesHeader';
import PresencesData from './PresencesData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// TODO: line 92 - dlaczego oceny 'Final' działa z console.log, a bez tego nie działa dobrze?

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
    let studentData = this.props.subject.querySelector('students');
    studentData = grade && JSON.parse(studentData.innerHTML);

    // PRESENCES START ##########################
    let presenceData;
    let presence = this.props.subject.querySelector('presences').querySelector('presence');
    if (presence) {
      presenceData = presence.querySelector('data').innerHTML;
      presenceData = parsePresence(presenceData);
      if (presenceData.length > 2) {
        presenceData = JSON.parse(presenceData);
      }
    }
    // PRESENCES END ##########################

    let gradesDescr = {};
    let gradesLabel = {};
    let gradesType = {};
    let gradesLen = grades && grades.length;
    if (gradesLen) {
      for (let i = 0; i < gradesLen; i++) {
        gradesDescr[grades[i].id] = grades[i].description;
        gradesLabel[grades[i].id] = grades[i].label;
        gradesType[grades[i].id] = grades[i].type;
      }
    }

    let stdGrdObj = {};
    let stdFinalGrade = '';

    return (
      <Fragment>
        <Paper elevation={0} style={{ border: '1px solid #e0e0e0', display: 'inline-block' }}>
          <Table className='grades-table' size='small' style={{ width: 'auto' }}>
            <TableHead>
              <TableRow style={{ color: '#444' }}>
                <TableCell style={{ backgroundColor: '#eeffff' }}><Box fontSize={16}>Uczeń</Box></TableCell>
                <TableCell style={{ backgroundColor: '#eeffff', borderRight: '1px solid #e0e0e0' }}><Box fontSize={16}>Nazwa użytk.</Box></TableCell>
                <GradeHeader gradesFromGrade={grades} />
                <PresencesHeader presenceData={presenceData} lessonsHours={this.props.lessonsHours} />
              </TableRow>
            </TableHead>
            <TableBody>
              {
                studentData && studentData.map(
                  student => (
                    (clickedId === null) || (student.grades.length && student.student_id.toString() === clickedId)
                      ?
                      <TableRow key={student.student_id}>
                        {stdFinalGrade = null}
                        <GradeStudents student={student} />
                        {
                          Object.keys(gradesLabel).map(
                            gradeId => (
                              stdGrdObj = student.grades.filter(
                                stdGrade => (stdGrade.column_id === Number(gradeId))
                                // eslint-disable-next-line
                              )[0],
                              gradesType && gradesType[gradeId] === 2
                              ? (stdGrdObj && (stdFinalGrade = `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`), console.log())
                              : <TableCell key={gradeId}>
                                {
                                  stdGrdObj && gradesType && gradesType[gradeId] !== 2
                                  ? `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`
                                  : '—'
                                }
                                </TableCell>
                            )
                          )
                        }
                        <TableCell style={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', fontWeight: 'bold', color: 'maroon', whiteSpace: 'nowrap' }}>
                          {stdFinalGrade ? stdFinalGrade : '—'}
                        </TableCell>
                        <PresencesData presenceData={presenceData} student={student} />
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