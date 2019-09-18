import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

// TODO: OK - Do przedmiotów dodać imię i nazwisko nauczyciela prowadzącego
// TODO: OK - Dodać imię i nazwisko ucznia obok 'user name' przy ocenach
// TODO: Kliknięcie ucznia powinno pokazać tylko te klasy, w któych miał oceny (w obu semestrach); wszystko inne ukryte, bo teraz jest nieintuicyjnie
// TODO: Dodać ocenę końcową/semestralną
// TODO: Dodać frekwencję - tylko info o statusie innym niż "obecny" + data + godzina lekcyjna

export class Grade extends Component {
  render() {
    const clickedId = this.props.studentClickedId;
    const grade = this.props.subject.querySelector('columns');
    const grades = grade && JSON.parse(grade.innerHTML);
    let studentData = this.props.subject.querySelector('students');
    studentData = grade && JSON.parse(studentData.innerHTML);

    let gradesDescr = {};
    let gradesLabel = {};
    let gradesLen = grades && grades.length;
    if (gradesLen) {
      for (let i = 0; i < gradesLen; i++) {
        gradesDescr[grades[i].id] = grades[i].description;
        gradesLabel[grades[i].id] = grades[i].label;
      }
    }

    let stdGrdObj = {};

    return (
      <table className='grades-table'>
        <tbody>
          <tr>
            <th>Student</th>
            <th style={{borderRight: '1px solid #bbb'}}>User name</th>
            {
              grades && grades.map(
                grade => (
                  <th key={grade.id}>{grade.label.length ? grade.label : '———'}</th>
                )
              )
            }
          </tr>
          {
            studentData && studentData.map(
              student => (
                (clickedId === null) || (student.grades.length && student.student_id.toString() === clickedId)
                ?
                  <tr key={student.student_id}>
                    <td>{this.props.studentName[student.student_id]} {this.props.studentSurname[student.student_id]}</td>
                    <td style={{borderRight: '1px solid #bbb'}}>{this.props.studentUserName[student.student_id]}</td>
                    {
                      Object.keys(gradesLabel).map(
                        gradeId => (
                          <td key={gradeId} style={{ whiteSpace: 'nowrap' }}>
                            {
                              student.grades.length
                                ? (stdGrdObj = student.grades.filter(
                                    stdGrade => (
                                      stdGrade.column_id === Number(gradeId)
                                    )
                                  )[0], stdGrdObj ? `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%` : '—')
                                : '—'
                            }
                          </td>
                        )
                      )
                    }
                  </tr>
                : null
              )
            )
          }
        </tbody>
      </table>
    )
  }
}

export default withXML(Grade);