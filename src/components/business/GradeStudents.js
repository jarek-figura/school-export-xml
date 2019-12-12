import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';

import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

export class GradeStudents extends PureComponent {

  render() {

    const clickedId = this.props.studentClickedId;
    const student = this.props.student;

    let colorName = {};
    if (clickedId) {
      colorName[clickedId] = 'secondary';
    } else {
      colorName[clickedId] = 'initial';
    }

    return (

      <Fragment>
        <TableCell  style={{ textAlign: 'left' }}>
          <Typography color={`${colorName[clickedId]}`}>
            {this.props.studentName[student.student_id]} {this.props.studentSurname[student.student_id]}
          </Typography>
        </TableCell>
        <TableCell style={{ borderRight: '1px solid #e0e0e0', textAlign: 'left' }}>
          <Typography color={`${colorName[clickedId]}`}>
            {this.props.studentUserName[student.student_id]}
          </Typography>
        </TableCell>
      </Fragment>
    )
  }
}

export default withXML(GradeStudents);