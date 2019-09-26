import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';
import filterSubjects from './SubjectFilter';

export class Clasa extends Component {

  render() {
    const clasa = this.props.clasa;
    // const subjects = Array.from(clasa.querySelectorAll('subject'));

    const subjects = filterSubjects(clasa, this.props.searchSubject);

    let subjectId = 0;
    return (
      <div>
        {
          subjects.map(
            subject => (
              <span key={subjectId++}>
                {subject.querySelector('grades').innerHTML.length
                  ? <Fragment>
                      <h4 style={{ color: '#666' }}>{subject.querySelector('name').innerHTML} - {subject.querySelector('teachers').querySelector('id') && this.props.teacherName[subject.querySelector('teachers').querySelector('id').innerHTML]} {subject.querySelector('teachers').querySelector('id') && this.props.teacherSurname[subject.querySelector('teachers').querySelector('id').innerHTML]}</h4>
                      <Grade subject={subject} />
                    </Fragment>
                  : <h4 style={{ color: 'silver' }}>no grades - {subject.querySelector('name').innerHTML}</h4>
                }
              </span>
            )
          )
        }
      </div>
    );
  }
}

export default withXML(Clasa);