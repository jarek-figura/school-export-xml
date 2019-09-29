import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

export class SubjectTeacher extends Component {

  render() {
    const subject = this.props.subject;
    const teachersTable = Array.from(subject.querySelector('teachers').querySelectorAll('teacher'));

    return (
      <h4 style={{ color: `${this.props.color}` }}>
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
      </h4>
    );
  }
}

export default withXML(SubjectTeacher);