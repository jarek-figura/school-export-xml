import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';

import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';

export class GradeHeader extends PureComponent {

  render() {

    const grades = this.props.gradesFromGrade;

    return (
      <Fragment>
        {
          grades && grades.map(
            grade => (
              grade.type !== 2 &&
              <TableCell key={grade.id}>
                <Tooltip
                  title={grade.label.length ? grade.description : '———'}
                  placement='top'
                >
                  <Box fontSize={16}>{grade.label.length ? grade.label : '———'}</Box>
                </Tooltip>
              </TableCell>
            )
          )
        }
        <TableCell style={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', color: 'maroon' }}><Box fontSize={16}>Ocena<br />semestralna</Box></TableCell>
      </Fragment>
    )
  }
}

export default withXML(GradeHeader);