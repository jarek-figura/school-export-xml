import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

// TODO: OK - Do przedmiotów dodać imię i nazwisko nauczyciela prowadzącego
// TODO: OK - Dodać imię i nazwisko ucznia obok 'user name' przy ocenach
// TODO: OK - Kliknięcie ucznia powinno pokazać tylko te klasy, w któych miał oceny (w obu semestrach); wszystko inne ukryte, bo teraz jest nieintuicyjnie
// TODO: OK - Dodać ocenę końcową/semestralną
// TODO: line 157 - dlaczego oceny 'Final' działa z console.log, a bez tego nie działa dobrze?
// TODO: OK - Dodać frekwencję + data + godzina lekcyjna
// TODO: OK - Dodać tekst 'Parsing XML ...' na zmianę stanu komponentów
// TODO: OK - Dodać filtrowanie przedmiotów

// TODO: INFO - ocena średnia (Average) zakomentowana tymczasowo; dodatkowo powinny być w niej uwzględniane wagi

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

    // LESSON ENTRIES START @@@@@@@@@@@@@@@@@@@
    const entries = this.props.subject.querySelector('lessons_entries');
    const entry = Array.from(entries.querySelectorAll('entry'));
    // LESSON ENTRIES END @@@@@@@@@@@@@@@@@@@@@

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
    // let stdSummaryGrade = [];
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
              {/* <th style={{ borderLeft: '1px solid #bbb' }}>Average</th> */}
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
                      {/* {stdSummaryGrade = []} */}
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
                                ? (
                                    // stdGrdObj.included_in_the_average && stdSummaryGrade.push(stdGrdObj.percentage),
                                    `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`
                                  )
                                : '—'
                              }
                              </TableCell>
                          )
                        )
                      }
                      {/* <td style={{ borderLeft: '1px solid #bbb', fontWeight: 'bold', color: '#444' }}>
                        {stdSummaryGrade.length ? (stdSummaryGrade.reduce((a, b) => a + b, 0) / stdSummaryGrade.length).toLocaleString('en-EN', { maximumFractionDigits: 1 }) : 0}%
                      </td> */}
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
        {
          this.props.showLessonEntries && entry.length
            ? <Box fontSize={18} style={{ padding: '8px' }}>Tematy lekcji</Box>
            : null
        }
        {
          this.props.showLessonEntries && entry.length
            ?
              <Table size='small' style={{ width: 'auto', marginBottom: '16px' }}>
                <TableHead>
                  <TableRow style={{ color: '#444' }}>
                    <TableCell style={{ backgroundColor: '#e0e0e0' }}><Box fontSize={16}>Data</Box></TableCell>
                    <TableCell style={{ backgroundColor: '#e0e0e0', borderRight: '1px solid #c0c0c0' }}><Box fontSize={16}>Lekcja</Box></TableCell>
                    <TableCell style={{ backgroundColor: '#e0e0e0' }}><Box fontSize={16}>Temat lekcji</Box></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    entry.map(
                      (obj, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{obj.querySelector('date').innerHTML}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>{lessonsHours[obj.querySelector('lesson_hour_id').innerHTML]}</TableCell>
                          <TableCell>{obj.querySelector('title').innerHTML}</TableCell>
                        </TableRow>
                      )
                    )
                  }
                </TableBody>
              </Table>
            : null
        }
      </Fragment>
    )
  }
}

export default withXML(Grade);