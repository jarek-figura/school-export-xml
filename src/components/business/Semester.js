import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Clasa from './Clasa';
import filterClass from './ClassFilter';
import ClasaTutor from './ClasaTutor';

// TODO: OK - dodać wychowawcę klasy

const isStudentInClass = (clickedId, clasa) => {
  const students = Array.from(clasa.querySelector('students').querySelectorAll('student'));
  for (let student of students) {
    if (student.firstChild.innerHTML === clickedId) {
      return true;
    }
  }
  return false;
}

export class Semester extends Component {

  render() {
    const clickedId = this.props.studentClickedId;
    const semId = this.props.semesterId;
    const semesters = this.props.semester;
    const semester = Array.from(semesters)[semId];
    let semStart, semEnd, semLabel;
    if (semester) {
      semStart = new Date(semester.querySelector('start').innerHTML);
      semEnd = new Date(semester.querySelector('end').innerHTML);
      semLabel = semester.querySelector('label').innerHTML;
    }

    const classes = filterClass(semId, semesters, this.props.searchClass.toLowerCase());

    let classId = 0;
    return (
      <Fragment>
        <h4 className='semester'>
          {`${semLabel}: ${semStart.toLocaleDateString('pl-PL')} - ${semEnd.toLocaleDateString('pl-PL')}`}
        </h4>
        {
          classes.map(
            clasa => (
              clickedId === null || isStudentInClass(clickedId, clasa)
              ? <span key={classId++}>
                  <h4 className='clasa'>
                    klasa: <ClasaTutor clasa={clasa} color='black' />
                  </h4>
                  <Clasa clasa={clasa}/>
                </span>
              : null
            )
          )
        }
      </Fragment>
    );
  }
}

export default withXML(Semester);