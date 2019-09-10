import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';

export class StudentActivity extends Component {
  handleClick = () => { };

  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? this.props.studentId[clickedId] : 0;
    const semester = this.props.semester && Array.from(this.props.semester);
    let semId = 0;

    return (
      <div className='school'>
        <h2 style={{ textAlign: 'left' }}>Student Activity</h2>
        <h3 style={{ textAlign: 'left' }}>user name: {userName}</h3>
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
    )
  }
}

export default withXML(StudentActivity);