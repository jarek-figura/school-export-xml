import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

export class ClasaTutor extends Component {

  render() {
    const clasa = this.props.clasa;
    const teachersTable = Array.from(clasa.querySelector('tutors').querySelectorAll('tutor'));

    return (
      <span style={{ color: `${this.props.color}` }}>
        {clasa.querySelector('name').innerHTML} ({
          teachersTable && teachersTable.map(
            (teacher, idx) => (
              <span key={idx}>
                {this.props.teacherName[teacher.querySelector('id').innerHTML]}&nbsp;{this.props.teacherSurname[teacher.querySelector('id').innerHTML]}
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