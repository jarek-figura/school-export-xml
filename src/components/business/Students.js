import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import StudentSearch from './StudentSearch';
import organizeStudents from "./organizeStudents";

export class Students extends Component {
  render() {
    const students = organizeStudents.apply(this);
    // const students = this.props.students;
    return (
      <div>
        <h2 style={{ textAlign: 'left' }}>Students found: {students.length}</h2>
        <h3 style={{ textAlign: 'left' }}>Search students by user name: <StudentSearch/></h3>
        {/* <h3 style={{ textAlign: 'left' }}>user name | id</h3> */}
        <h3 style={{ textAlign: 'left' }}>user name</h3>
        <ol>
          {
            students.map(
              student => (
                <li key={student.firstChild.innerHTML} style={{ textAlign: 'left' }}>
                  {/* <span>{student.getElementsByTagName('username')[0].innerHTML}</span> | <span>{student.firstChild.innerHTML}</span> */}
                  <span>{student.getElementsByTagName('username')[0].innerHTML}</span>
                </li>
              )
            )
          }
        </ol>
      </div>
    )
  }
}

export default withXML(Students);