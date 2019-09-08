import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import StudentSearch from './StudentSearch';
import organizeStudents from "./organizeStudents";
import './Students.css';

export class Students extends Component {
  handleClick = () => { };

  render() {
    const students = organizeStudents.apply(this);

    return (
      <div>
        <h2 style={{ textAlign: 'left' }}>Students found: {students.length}</h2>
        <h3 style={{ textAlign: 'left' }}>Search students by user name: <StudentSearch /></h3>
        <table className='student-data'>
          <tbody>
          <tr>
            <th rowSpan='2'>
              {this.props.students.length !== 0 && <h3>user name</h3>}
            </th>
            <th colSpan='2'>
                {this.props.students.length !== 0 && <h3>student data</h3>}
            </th>
          </tr>
            {this.props.students.length !== 0 && <tr><th>name</th><th>surname</th></tr>}
          {
            students.map(
              student => (
                <tr key={student.firstChild.innerHTML} onClick={this.handleClick} className='student'>
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