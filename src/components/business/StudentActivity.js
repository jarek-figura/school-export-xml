import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';
import SubjectSearch from './SubjectSearch';
import ClassSearch from './ClassSearch';
import TeacherSearch from './TeacherSearch';

export class StudentActivity extends Component {

  handleResetStudent = () => {
    this.props.handleStudentClick(null);
  };

  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? `${this.props.studentName[clickedId]} ${this.props.studentSurname[clickedId]} - ${this.props.studentUserName[clickedId]}` : 'All students';
    const semester = this.props.semester && Array.from(this.props.semester);
    let semId = 0;

    return (
      <span className='school'>
        <div className='school-top'>
          <h2 style={{ textAlign: 'left' }}>Student Activity</h2>
          <h3 style={{ textAlign: 'left' }}>
            student: <span style={{ color: 'blue' }}>{userName}</span> {clickedId
              ? <button onClick={this.handleResetStudent} style={{ color: 'red' }}>Reset student</button>
              : null
            }
          </h3>
          <div>
            <ClassSearch/>
          </div>
          <div>
            <SubjectSearch/>
          </div>
          <div>
            <TeacherSearch/>
          </div>
          <p>&nbsp;</p>
        </div>
        <div className='semester-column'>
        {
          semester && semester.map(
            semester => (
              <div key={semId++}>
                <Semester semesterId={semId - 1} />
              </div>
            )
          )
        }
        </div>
      </span>
    )
  }
}

export default withXML(StudentActivity);