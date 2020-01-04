import React, { PureComponent } from 'react';
import { withXML } from '../contexts/XML';
import * as L from 'list';

import Box from '@material-ui/core/Box';

export class SubjectTeacher extends PureComponent {

  render() {
    const subject = this.props.subject;
    const teachersTable = L.from(Object.values(subject.teachers).flat());
    const color = this.props.color;

    let idx = 0;
    return (
      <Box fontSize={18} style={{ color: color, padding: '8px', margin: '4px 0', backgroundColor: '#ddd', maxWidth: '984px' }}>
        { subject.name } ({
          teachersTable && L.map(
            teacher => (
              <span key={teacher.id}>
                {this.props.teacherName[teacher.id]}&nbsp;{this.props.teacherSurname[teacher.id]}
                {teachersTable.length > 1 && idx++ < teachersTable.length - 1 ? ', ' : ''}
              </span>
            ),
            teachersTable
          )
        })
      </Box>
    );
  }
}

export default withXML(SubjectTeacher);