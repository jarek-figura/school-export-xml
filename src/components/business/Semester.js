import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import Clasa from './Clasa';
import filterClass from './ClassFilter';
import ClasaTutor from './ClasaTutor';

// TODO: OK - dodać wychowawcę klasy

const isStudentInClass = (clickedId, clasa) => {
  const students = Array.from(clasa.querySelector('students').querySelectorAll('student'));
  let std;
  for (std of students) {
    if (std.firstChild.innerHTML === clickedId) {
      return true;
    }
  }
  return false;
}

export class Semester extends Component {

  render() {
    const clickedId = this.props.studentClickedId;
    const semester = this.props.sem;
    let semStart, semEnd, semLabel;
    if (semester) {
      semStart = new Date(semester.querySelector('start').innerHTML);
      semEnd = new Date(semester.querySelector('end').innerHTML);
      semLabel = semester.querySelector('label').innerHTML;
    }

    const classes = filterClass(semester, this.props.searchClass.toLowerCase());

    return (
      <Fragment>
        <h4 className='semester'>
          {`${semLabel}: ${semStart.toLocaleDateString('pl-PL')} - ${semEnd.toLocaleDateString('pl-PL')}`}
        </h4>
        {
          classes.map(
            (clasa, idx) => (
              clickedId === null || isStudentInClass(clickedId, clasa)
              ? <span key={idx}>
                  <h4 className='clasa'>
                    klasa: <ClasaTutor clasa={clasa} />
                  </h4>
                  <Clasa clasa={clasa} lessonsHours={semester.querySelector('lessons_hours')} />
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