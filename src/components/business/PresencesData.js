import React from 'react';
import * as L from 'list';

import TableCell from '@material-ui/core/TableCell';

function PresencesData(props) {

  const presTypeTransl = {
    'present': 'obecny(a)',
    'absent': 'nieobecny(a)',
    'late': 'spóźniony(a)',
    'absence_excused': 'nieobecność usprawiedliwiona',
    'being_late_excused': 'spóźnienie usprawiedliwione',
    'none': 'none',
    'released': 'zwolniony(a)'
  };

  const presencesTypes = props.presencesTypesFromGrade;
  const presenceData = props.presenceData;
  const studentId = props.studentId;

  return (
    presenceData && L.map(
      obj => (
        obj.students && obj.students.map(
          std => (
            studentId === std.student_id &&
            <TableCell key={std.student_id}>{presTypeTransl[presencesTypes[std.presence]]}</TableCell>
          )
        )
      ),
      presenceData
    )
  )
}

export default PresencesData;