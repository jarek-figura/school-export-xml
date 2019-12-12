import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';

import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';

export class PresencesHeader extends PureComponent {

  render() {

    let lessonsHours = {};
    let lessHours = Array.from(this.props.lessonsHours.querySelectorAll('lesson_hour'));
    let hour;
    for (hour of lessHours) {
      lessonsHours[hour.querySelector('id').innerHTML] = hour.querySelector('label').innerHTML;
    }

    const presenceData = this.props.presenceData;

    return (
      <Fragment>
        {
          this.props.showStudentPresences && presenceData && Array.from(presenceData).map(
            (obj, idx) => (
              obj.date &&
              <TableCell key={idx} style={{ backgroundColor: '#def' }}>
                <Box fontSize={16}>{new Date(obj.date * 1000).toLocaleDateString('pl-PL')}<br />{lessonsHours[obj.school_lesson_hour_id]}</Box>
              </TableCell>
            )
          )
        }
      </Fragment>
    )
  }
}

export default withXML(PresencesHeader);