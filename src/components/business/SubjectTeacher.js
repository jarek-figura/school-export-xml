import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

import Box from '@material-ui/core/Box';

export class SubjectTeacher extends Component {

  render() {
    const subject = this.props.subject;
    const teachersTable = Array.from(subject.querySelector('teachers').querySelectorAll('teacher'));

    return (
      <Box fontSize={18} style={{ color: `${this.props.color}`, padding: '8px' }}>
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