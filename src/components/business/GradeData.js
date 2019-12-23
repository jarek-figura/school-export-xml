import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import * as L from 'list';

import TableCell from '@material-ui/core/TableCell';

export class GradeData extends PureComponent {

  render() {

    const grades = this.props.gradesFromGrade;
    const gradesLen = grades && grades.length;
    if (!gradesLen) return null;

    const student = this.props.student;
    const stdGrades = L.from(student.grades);

    const studentId = student.student_id
    // console.log(studentId); // student_id, grades
    // console.log(student); // student_id, grades
    // console.log(grades);  // grades header ids

    //<grades><columns>
    const gradesDescr = L.pluck('description', grades);
    const gradesLabel = L.pluck('label', grades);
    const gradesType = L.pluck('type', grades);
    const gradesId = L.pluck('id', grades);
    L.forEach(el => {

    }, grades);

    let stdGrdObj;
    let stdFinalGrade = null;

    return (
      <Fragment>
        {stdFinalGrade = null}
        {
          L.map(
            gradeId => (    // grade header id
              // eslint-disable-next-line
              stdGrdObj = L.filter(stdGrade => stdGrade.column_id === gradeId, stdGrades),
              console.log(gradesType),
              gradesType && gradesType[gradeId] === 2
              ? (stdFinalGrade = `${L.pluck('label', stdGrdObj).length ? L.pluck('label', stdGrdObj) : '0'} | ${L.pluck('percentage', stdGrdObj)}%`)
              : <TableCell key={gradeId}>
                {
                  stdGrdObj && gradesType && gradesType[gradeId] !== 2
                  ? `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`
                  : '—'
                }
                </TableCell>
            ), gradesId
          )
        }
        <TableCell style={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', fontWeight: 'bold', color: 'maroon', whiteSpace: 'nowrap' }}>
          {stdFinalGrade ? stdFinalGrade : '—'}
        </TableCell>
      </Fragment>
    )
  }
}

export default withXML(GradeData);

        // Object.keys(gradesLabel).map(
        //   gradeId => (
        //     stdGrdObj = student.grades.filter(
        //       stdGrade => (stdGrade.column_id === Number(gradeId))
        //       // eslint-disable-next-line
        //     )[0],
        //     gradesType && gradesType[gradeId] === 2
        //     ? (stdGrdObj && (stdFinalGrade = `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`), console.log())
        //     : <TableCell key={gradeId}>
        //       {
        //         stdGrdObj && gradesType && gradesType[gradeId] !== 2
        //         ? `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`
        //         : '—'
        //       }
        //       </TableCell>
        //   )
        // )
