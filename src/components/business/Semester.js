import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import Clasa from './Clasa';

export class Semester extends Component {

  render() {
    const semId = this.props.semesterId;
    const semesters = this.props.semester;
    const classes = Array.from(semesters[semId].querySelectorAll('class'));
    const semester = Array.from(semesters)[semId];
    let semStart, semEnd, semLabel;
    if (semester) {
      semStart = new Date(semester.querySelector('start').innerHTML);
      semEnd = new Date(semester.querySelector('end').innerHTML);
      semLabel = semester.querySelector('label').innerHTML;
    }

    let classId = 0;
    return (
      <div>
        <h4 className='semester'>{`${semLabel}: ${semStart.toLocaleDateString('pl-PL')} - ${semEnd.toLocaleDateString('pl-PL')}`}</h4>
        {
          classes.map(
            clasa => (
              <span key={classId++}>
                <h4 className='clasa'>klasa: {clasa.querySelector('name').innerHTML}</h4>
                <Clasa clasa={clasa}/>
              </span>
            )
          )
        }
      </div>
    );
  }
}

export default withXML(Semester);