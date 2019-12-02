import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

import Box from '@material-ui/core/Box';

export class SubjectTeacher extends Component {

  render() {
    const subject = this.props.subject;
    const teachersTable = Array.from(subject.querySelector('teachers').querySelectorAll('teacher'));
    const color = this.props.color;

    return (
      <Box fontSize={18} style={{ color: color, padding: '8px', margin: '4px 0', backgroundColor: `${color !== 'silver' ? '#efefef' : 'transparent'}`, maxWidth: '984px' }}>
        {subject.querySelector('name').innerHTML} ({
          teachersTable && teachersTable.map(
            (teacher, idx) => (
              <span key={idx}>
                {this.props.teacherName[teacher.querySelector('id').innerHTML]}&nbsp;{this.props.teacherSurname[teacher.querySelector('id').innerHTML]}
                {teachersTable.length > 1 && idx < teachersTable.length - 1 ? ', ' : ''}
              </span>
            )
          )
        })
      </Box>
    );
  }
}

export default withXML(SubjectTeacher);