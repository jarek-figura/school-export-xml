import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import StudentSearch from './StudentSearch';
import organizeStudents from "./organizeStudents";
import './Students.css';

export class Students extends Component {
  handleClick = (key) => {
    this.props.handleStudentClick(key);
  };

  render() {
    const students = organizeStudents.apply(this);

    return (
      <div className='students'>
        <h2 style={{ textAlign: 'left' }}>Students found: {students.length}</h2>
        <h3 style={{ textAlign: 'left' }}>Search students by user name: <StudentSearch /></h3>
        <table className='student-data'>
          <tbody>
            {this.props.students.length !== 0 &&
              <tr>
                <th rowSpan='2'>user name</th>
                <th colSpan='2'>student data</th>
              </tr>
            }
            {this.props.students.length !== 0 && <tr><th>name</th><th>surname</th></tr>}
            {
              students.map(
                student => (
                  <tr key={student.firstChild.innerHTML} onClick={() => this.handleClick(student.firstChild.innerHTML)} className='student'>
                    <td>{student.getElementsByTagName('username')[0].innerHTML}</td>
                    <td>
                      {student.getElementsByTagName('personal_data')[0].innerHTML && JSON.parse(student.getElementsByTagName('personal_data')[0].innerHTML).adres.name}
                    </td>
                    <td>
                      {student.getElementsByTagName('personal_data')[0].innerHTML && JSON.parse(student.getElementsByTagName('personal_data')[0].innerHTML).adres.surname}
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default withXML(Students);