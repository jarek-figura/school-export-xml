import React, { PureComponent } from 'react';
import { withXML } from '../contexts/XML';
import * as L from 'list';

export class SubjectTeacher extends PureComponent {

  handleClick = (id) => {
    this.props.handleSubjectClick(id);
    this.props.handleSecondClick();
  };

  render() {
    const subject = this.props.subject;
    const teachersTable = L.from(Object.values(subject.teachers).flat());
    const color = this.props.color;
    const clickedId = this.props.subjectClickedId;

    let idx = 0;
    return (
      <div
        style={{ color: color }}
        className={`${clickedId && clickedId === this.props.id ? 'subject-clicked' : 'subject'}`}
        onClick={() => this.handleClick(this.props.id)}
      >
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
      </div>
    );
  }
}

export default withXML(SubjectTeacher);