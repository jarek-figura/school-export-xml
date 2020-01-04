import React from 'react';

import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';

function PresencesHeader(props) {

  let lessonsHours = {};
  let lessHours = props.lessonsHours;
  let hour;
  for (hour of lessHours) {
    lessonsHours[hour.id] = hour.label;
  }

  const presenceData = props.presenceData;

  return (
    presenceData && Array.from(presenceData).map(
      (obj, idx) => (
        obj.date &&
        <TableCell key={idx} style={{ backgroundColor: '#def' }}>
          <Box fontSize={16}>{new Date(obj.date * 1000).toLocaleDateString('pl-PL')}<br />{lessonsHours[obj.school_lesson_hour_id]}</Box>
        </TableCell>
      )
    )
  )
}

export default PresencesHeader;