import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';

import TableCell from '@material-ui/core/TableCell';

export class PresencesData extends PureComponent {

  render() {

    const presTypeTransl = {
      'present': 'obecny(a)',
      'absent': 'nieobecny(a)',
      'late': 'spóźniony(a)',
      'absence_excused': 'nieobecność usprawiedliwiona',
      'being_late_excused': 'spóźnienie usprawiedliwione',
      'none': 'none',
      'released': 'zwolniony(a)'
    };

    const presencesTypes = this.props.presencesTypesFromGrade;
    const presenceData = this.props.presenceData;
    const student = this.props.student;

    return (
      <Fragment>
        {
          this.props.showStudentPresences && presenceData && Array.from(presenceData).map(
            obj => (
              obj.students && obj.students.map(
                (std, idx) => (
                  student.student_id === std.student_id &&
                  <TableCell key={idx}>{presTypeTransl[presencesTypes[std.presence]]}</TableCell>
                )
              )
            )
          )
        }
      </Fragment>
    )
  }
}

export default withXML(PresencesData);