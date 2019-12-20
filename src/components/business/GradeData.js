import React, { Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';

// TODO: line 37 - dlaczego oceny 'Final' działa z console.log, a bez tego nie działa dobrze?

function GradeData(props) {

    const grades = props.gradesFromGrade;
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
        {stdFinalGrade = null}
        {
          Object.keys(gradesLabel).map(
            gradeId => (
              stdGrdObj = props.student.grades.filter(
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
      </Fragment>
    )
}

export default GradeData;