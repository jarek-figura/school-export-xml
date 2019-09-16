import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';

export class Clasa extends Component {

  render() {
    const clasa = this.props.clasa;
    const subjects = Array.from(clasa.querySelectorAll('subject'));
    let subjectId = 0;

    return (
      <div>
        {
          subjects.map(
            subject => (
              <span key={subjectId++}>
                {subject.querySelector('grades').innerHTML.length
                  ? <Fragment>
                      <h4>{subject.querySelector('name').innerHTML} - {subject.querySelector('teachers').querySelector('id') && this.props.teacherName[subject.querySelector('teachers').querySelector('id').innerHTML]} {subject.querySelector('teachers').querySelector('id') && this.props.teacherSurname[subject.querySelector('teachers').querySelector('id').innerHTML]}</h4>
                      <Grade subject={subject} />
                    </Fragment>
                  : <h5>no grades - {subject.querySelector('name').innerHTML}</h5>
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