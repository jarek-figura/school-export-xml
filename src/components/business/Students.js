import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import StudentSearch from './StudentSearch';
import filterStudents from './StudentsFilter';
import './Students.css';

// TODO: OK - Wyszukiwanie ucznia po imieniu i nazwisku

export class Students extends Component {
  state = {
    students: this.props.students
  };

  handleClick = (id) => { this.props.handleStudentClick(id) };
  handleSortUserName = () => { };
  handleSortNameSurname = () => { };

  render() {

    const students = filterStudents.apply(this);

    return (
      <div className='students'>
        <h2 style={{ textAlign: 'left' }}>Students found: {students.length}</h2>
        <h3 style={{ textAlign: 'left' }}>Search students by:</h3>
        <div className='student-search'>
          <StudentSearch />
        </div>
        <table className='student-data'>
          <tbody>
            {this.props.students.length !== 0 &&
              <tr>
                <th className='user-name' onClick={this.handleSortUserName}>user name</th>
                <th className='user-name' onClick={this.handleSortNameSurname}>name surname</th>
              </tr>
            }
            {
              students.map(
                student => (
                  <tr key={student.firstChild.innerHTML} onClick={() => this.handleClick(student.firstChild.innerHTML)} className='student'>
                    <td>{student.querySelector('username').innerHTML}</td>
                    <td>
                      {student.querySelector('personal_data').innerHTML && JSON.parse(student.querySelector('personal_data').innerHTML).adres.name} {student.querySelector('personal_data').innerHTML && JSON.parse(student.querySelector('personal_data').innerHTML).adres.surname}
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