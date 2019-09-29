import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';
import filterSubjects from './SubjectFilter';
import filterTeachers from './TeacherFilter';

// TODO: OK - dodać więcej, niż jednego nauczyciela do przedmiotu
// TODO: OK - dodać filtrowanie nauczycieli danych przedmiotów, wychowawców nie filtrować

export class Clasa extends Component {

  render() {
    const clasa = this.props.clasa;

    let subjects = filterSubjects(clasa, this.props.searchSubject);
    subjects = filterTeachers(subjects, this.props.teacherName, this.props.teacherSurname, this.props.searchTeacherName, this.props.searchTeacherSurname);

    let subjectId = 0;
    let teachersTable = [];
    return (
      <div>
      {
        subjects.map(
          subject => (
            teachersTable = Array.from(subject.querySelector('teachers').querySelectorAll('teacher')),
            <span key={subjectId++}>
            {subject.querySelector('grades').innerHTML.length
              ? <Fragment>
                  <h4 style={{ color: '#666' }}>
                  {subject.querySelector('name').innerHTML} ({
                    teachersTable && teachersTable.map(
                      (teacher, idx) => (
                        <span key={teacher.querySelector('id').innerHTML}>
                          {this.props.teacherName[teacher.querySelector('id').innerHTML]}&nbsp;{this.props.teacherSurname[teacher.querySelector('id').innerHTML]}
                          {teachersTable.length > 1 && idx < teachersTable.length - 1 ? ', ' : ''}
                        </span>
                      )
                    )
                  })
                  </h4>
                  <Grade subject={subject} />
                </Fragment>
              : <h4 style={{ color: 'silver' }}>
                no grades - {subject.querySelector('name').innerHTML} ({
                  teachersTable && teachersTable.map(
                    (teacher, idx) => (
                      <span key={teacher.querySelector('id').innerHTML}>
                        {this.props.teacherName[teacher.querySelector('id').innerHTML]}&nbsp;{this.props.teacherSurname[teacher.querySelector('id').innerHTML]}
                        {teachersTable.length > 1 && idx < teachersTable.length - 1 ? ', ' : ''}
                      </span>
                    )
                  )
                })
              </h4>
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