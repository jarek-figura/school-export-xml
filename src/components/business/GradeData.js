import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import * as L from 'list';

import TableCell from '@material-ui/core/TableCell';

export class GradeData extends PureComponent {

  render() {

    const grades = this.props.gradesFromGrade;
    const gradesId = grades && L.pluck('id', grades);
    // const gradesLen = grades && grades.length;
    // if (!gradesLen) return null;

    const student = this.props.student;
    const stdGrades = L.from(student.grades);
    // console.log(stdGrades);

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
              // console.log(stdObj && stdObj.label),
              gradesType[gradeId] !== 2
              ? <TableCell key={gradeId}>
                  {
                    stdObj && gradesType[gradeId] !== 2
                    ? `${stdObj.label ? stdObj.label : '0'} | ${stdObj.percentage}%`
                    : '—'
                  }
                </TableCell>
              : (stdFinalGrade = stdObj && `${stdObj.label ? stdObj.label : '0'} | ${stdObj.percentage}%`, null)
              // : null
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