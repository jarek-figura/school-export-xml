import React, { PureComponent, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';
import filterSubjects from './SubjectFilter';
import filterTeachers from './TeacherFilter';
import SubjectTeacher from './SubjectTeacher';

// INFO: wychowawcy nie są filtrowani

export class Clasa extends PureComponent {

  render() {
    const clasa = this.props.clasa;

    let subjects = filterSubjects(clasa, this.props.searchSubject);
    subjects = filterTeachers(subjects, this.props.teacherName, this.props.teacherSurname, this.props.searchTeacherName, this.props.searchTeacherSurname);

    return (
      <div>
      {
        subjects.map(
          (subject, idx) => (
            <span key={idx}>
              {subject.querySelector('grades').innerHTML.length
                ? <Fragment>
                    <SubjectTeacher subject={subject} color='black' />
                    <Grade subject={subject} lessonsHours={this.props.lessonsHours} />
                  </Fragment>
                : <SubjectTeacher subject={subject} color='silver' />
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