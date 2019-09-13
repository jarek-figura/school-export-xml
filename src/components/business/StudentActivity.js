import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';

export class StudentActivity extends Component {

  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? this.props.studentId[clickedId] : 'All students';
    const semester = this.props.semester && Array.from(this.props.semester);
    let semId = 0;

    return (
      <Fragment>
        <div className='school'>
          <span>
            <h2 style={{ textAlign: 'left' }}>Student Activity</h2>
            <h3 style={{ textAlign: 'left' }}>user name: {userName}</h3>
          </span>
          {
            semester && semester.map(
              semester => (
                <span key={semId++}>
                  <Semester semesterId={semId - 1} />
                </span>
              )
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default withXML(StudentActivity);