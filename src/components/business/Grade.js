import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import LessonEntries from './LessonEntries';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

// TODO: line 146 - dlaczego oceny 'Final' działa z console.log, a bez tego nie działa dobrze?

const parsePresence = data => {
  data = data && data.length && data.replace(/u'/g, '\'');
  return data && data.length && data.replace(/'/g, '"');
};

export class Grade extends Component {

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
    let lessonsHours = {};
    let lessHours = Array.from(this.props.lessonsHours.querySelectorAll('lesson_hour'));
    let hour;
    for (hour of lessHours) {
      lessonsHours[hour.querySelector('id').innerHTML] = hour.querySelector('label').innerHTML;
    }
    let presenceData;
    let presence = this.props.subject.querySelector('presences').querySelector('presence');
    if (presence) {
      presenceData = presence.querySelector('data').innerHTML;
      presenceData = parsePresence(presenceData);
      if (presenceData.length > 2) {
        presenceData = JSON.parse(presenceData);
      }
    }
    const presTypeTransl = {
      'present': 'obecny(a)',
      'absent': 'nieobecny(a)',
      'late': 'spóźniony(a)',
      'absence_excused': 'nieobecność usprawiedliwiona',
      'being_late_excused': 'spóźnienie usprawiedliwione',
      'none': 'none',
      'released': 'zwolniony(a)'
    };
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

    let colorName = {};
    if (clickedId) {
      colorName[clickedId] = 'secondary';
    } else {
      colorName[clickedId] = 'initial';
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
                {
                  grades && grades.map(
                    grade => (
                      grade.type !== 2 &&
                      <TableCell key={grade.id}>
                        <Tooltip
                          title={grade.label.length ? grade.description : '———'}
                          placement='top'
                        >
                          <Box fontSize={16}>{grade.label.length ? grade.label : '———'}</Box>
                        </Tooltip>
                      </TableCell>
                    )
                  )
                }
                <TableCell style={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', color: 'maroon' }}><Box fontSize={16}>Ocena<br />semestralna</Box></TableCell>
                {
                  this.props.showStudentPresences && presenceData && Array.from(presenceData).map(
                    (obj, idx) => (
                      obj.date &&
                      <TableCell key={idx} style={{ backgroundColor: '#def' }}>
                        <Box fontSize={16}>{new Date(obj.date * 1000).toLocaleDateString('pl-PL')}<br />{lessonsHours[obj.school_lesson_hour_id]}</Box>
                      </TableCell>
                    )
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                studentData && studentData.map(
                  (student, idx) => (
                    (clickedId === null) || (student.grades.length && student.student_id.toString() === clickedId)
                      ?
                      <TableRow key={idx}>
                        {stdFinalGrade = null}
                        <TableCell>
                          <Typography color={`${colorName[clickedId]}`}>
                            {this.props.studentName[student.student_id]} {this.props.studentSurname[student.student_id]}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
                          <Typography color={`${colorName[clickedId]}`}>
                            {this.props.studentUserName[student.student_id]}
                          </Typography>
                        </TableCell>
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
                        {
                          this.props.showStudentPresences && presenceData && Array.from(presenceData).map(
                            obj => (
                              obj.students && obj.students.map(
                                (std, idx) => (
                                  // this.props.studentUserName[std.student_id] - student.student_id
                                  student.student_id === std.student_id &&
                                  <TableCell key={idx}>{presTypeTransl[this.props.presencesTypes[std.presence]]}</TableCell>
                                )
                              )
                            )
                          )
                        }
                      </TableRow>
                    : null
                  )
                )
              }
            </TableBody>
          </Table>
        </Paper>
        <LessonEntries lessonsHours={lessonsHours} subject={this.props.subject} />
      </Fragment>
    )
  }
}

export default withXML(Grade);