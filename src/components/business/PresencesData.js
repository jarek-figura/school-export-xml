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
    const studentId = this.props.studentId;

    return (
      <Fragment>
        {
          presenceData && Array.from(presenceData).map(
            obj => (
              obj.students && obj.students.map(
                std => (
                  studentId === std.student_id &&
                  <TableCell key={std.student_id}>{presTypeTransl[presencesTypes[std.presence]]}</TableCell>
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