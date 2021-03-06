import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class LessonEntries extends PureComponent {

  render() {

    const lessonsHours = this.props.lessonsHours;
    const entry = Object.values(this.props.subject.lessons_entries).flat();

    return (
      <Fragment>
        {
          this.props.showLessonEntries && entry.length
            ? <Box fontSize={18} style={{ padding: '8px' }}>Tematy lekcji</Box>
            : null
        }
        {
          this.props.showLessonEntries && entry.length
            ?
              <Table size='small' style={{ width: 'auto', marginBottom: '16px' }}>
                <TableHead>
                  <TableRow style={{ color: '#444' }}>
                    <TableCell style={{ backgroundColor: '#f0f0f0' }}><Box fontSize={16}>Data</Box></TableCell>
                    <TableCell style={{ backgroundColor: '#f0f0f0', borderRight: '1px solid #d0d0d0' }}><Box fontSize={16}>Lekcja</Box></TableCell>
                    <TableCell style={{ backgroundColor: '#f0f0f0' }}><Box fontSize={16}>Temat lekcji</Box></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    entry.map(
                      (obj, idx) => (
                        <TableRow key={idx}>
                          <TableCell style={{ whiteSpace: 'nowrap' }}>{obj.date}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>{lessonsHours[obj.lesson_hour_id]}</TableCell>
                          <TableCell>{obj.title}</TableCell>
                        </TableRow>
                      )
                    )
                  }
                </TableBody>
              </Table>
            : null
        }
      </Fragment>
    )
  }
}

export default withXML(LessonEntries);