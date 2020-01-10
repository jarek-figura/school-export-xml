import React, { PureComponent } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';
import filterSubjects from './SubjectFilter';
import filterTeachers from './TeacherFilter';
import SubjectTeacher from './SubjectTeacher';
import LessonEntries from './LessonEntries';
import * as L from 'list/methods';

// INFO: wychowawcy nie są filtrowani

export class Clasa extends PureComponent {

  render() {
    const clasa = this.props.clasa;
    const classStudents = clasa.students.student;

    let subjects = filterSubjects(clasa, this.props.searchSubject);
    subjects = filterTeachers(subjects, this.props.teacherName, this.props.teacherSurname, this.props.searchTeacherName, this.props.searchTeacherSurname);

    return (
      <div>
      {
        L.map(
          subject => ( 
            <span key={subject.id}>
              <SubjectTeacher subject={subject} color={subject.grades !== '' ? 'black' : '#888'} />
              {
                this.props.showLessonEntries && subject.lessons_entries.entry
                  ? <LessonEntries lessonsHours={this.props.lessonsHours} subject={subject} />
                  : <Grade classStudents={classStudents} subject={subject} lessonsHours={this.props.lessonsHours} />
              }
            </span>
          ),
          subjects
        )
      }
      </div>
    );
  }
}

export default withXML(Clasa);