import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';
import filterSubjects from './SubjectFilter';
import filterTeachers from './TeacherFilter';
import SubjectTeacher from './SubjectTeacher';

// TODO: OK - dodać więcej, niż jednego nauczyciela do przedmiotu
// TODO: OK - dodać filtrowanie nauczycieli danych przedmiotów, wychowawców nie filtrować

export class Clasa extends Component {

  render() {
    const clasa = this.props.clasa;

    let subjects = filterSubjects(clasa, this.props.searchSubject);
    // subjects = filterTeachers(subjects, this.props.teacherName, this.props.teacherSurname, this.props.searchTeacherName, this.props.searchTeacherSurname);

    let subjectId = 0;
    return (
      <div>
      {
        subjects.map(
          subject => (
            <span key={subjectId++}>
              {subject.querySelector('grades').innerHTML.length
                ? <Fragment>
                    <SubjectTeacher subject={subject} color='#666'/>
                    <Grade subject={subject} />
                  </Fragment>
                : <SubjectTeacher subject={subject} color='silver'/>
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