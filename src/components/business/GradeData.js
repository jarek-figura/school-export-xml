import React, { Fragment } from 'react';
import * as L from 'list';

import TableCell from '@material-ui/core/TableCell';

function GradeData(props) {

  const grades = props.gradesFromGrade;
  const gradesId = grades && L.pluck('id', grades);
  const gradesLen = grades && grades.length;
  if (!gradesLen) return null;

  const student = props.student;
  const stdGrades = L.from(student.grades);

  let gradesType = {};
  L.forEach(el => {
    gradesType[el.id] = el.type;
  }, grades);

  let stdFinalGrade = null;
  let stdObj;

  return (
    <Fragment>
      {stdFinalGrade = null}
      {
        gradesId && L.map(
          gradeId => (    // grade header id
            // eslint-disable-next-line
            [stdObj] = L.filter(stdGrade => stdGrade.column_id === gradeId, stdGrades),
            gradesType[gradeId] !== 2
              ? <TableCell key={gradeId}>
                {
                  stdObj && gradesType[gradeId] !== 2
                    ? `${stdObj.label ? stdObj.label : '0'} | ${stdObj.percentage}%`
                    : '—'
                }
                </TableCell>
              : (stdFinalGrade = stdObj && `${stdObj.label ? stdObj.label : '0'} | ${stdObj.percentage}%`, null)
          ), gradesId
        )
      }
      <TableCell style={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', fontWeight: 'bold', color: 'maroon', whiteSpace: 'nowrap' }}>
        {stdFinalGrade ? stdFinalGrade : '—'}
      </TableCell>
    </Fragment>
  )
}

export default GradeData;