import React, { PureComponent } from 'react';
import { withXML } from '../contexts/XML';

export class ClasaTutor extends PureComponent {

  render() {
    const clasa = this.props.clasa;
    const teachersTable = Object.values(clasa.tutors).flat();

    return (
      <span style={{ color: `${this.props.color}` }}>
        {clasa.name} ({
          teachersTable && teachersTable.map(
            (teacher, idx) => (
              <span key={idx}>
                {this.props.teacherName[teacher.id]}&nbsp;{this.props.teacherSurname[teacher.id]}
                {teachersTable.length > 1 && idx < teachersTable.length - 1 ? ', ' : ''}
              </span>
            )
          )
        })
      </span>
    );
  }
}

export default withXML(ClasaTutor);