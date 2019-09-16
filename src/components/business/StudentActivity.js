import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';
import ClassSearch from './ClassSearch';


export class StudentActivity extends Component {

  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? this.props.studentUserName[clickedId] : 'All students';
    const semester = this.props.semester && Array.from(this.props.semester);
    let semId = 0;

    return (
      <Fragment>
        <div className='school'>
          <div>
            <h2 style={{ textAlign: 'left' }}>Student Activity</h2>
            <h3 style={{ textAlign: 'left' }}>user name: {userName}</h3>
            <div>
              <ClassSearch/>
            </div>
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
        </div>
      </Fragment>
    )
  }
}

export default withXML(StudentActivity);