import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import StudentSearch from './StudentSearch';
import filterStudents from './StudentsFilter';
import './Students.css';

// TODO: OK - Wyszukiwanie ucznia po imieniu i nazwisku

export class Students extends Component {

  handleClick = (id) => { this.props.handleStudentClick(id) };
  handleSortUserName = () => { };
  handleSortNameSurname = () => { };

  render() {
    const clickedId = this.props.studentClickedId;
    let tmpClassName = {};
    if (clickedId) {
      tmpClassName[clickedId] = 'student-clicked-id';
    } else {
      tmpClassName[clickedId] = 'student-not-clicked';
    }

    const students = filterStudents.apply(this);

    let adres;
    let personalData;
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
                (student, idx) => (
                  // eslint-disable-next-line
                  personalData = student.querySelector('personal_data').innerHTML,
                  adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
                  <tr
                    key={idx}
                    onClick={() => this.handleClick(student.firstChild.innerHTML)}
                    className={`student ${student.querySelector('id').innerHTML === clickedId && tmpClassName[clickedId]}`}
                  >
                    <td>{student.querySelector('username').innerHTML}</td>
                    <td>
                      {adres && 'name' in adres && adres.name} {adres && 'surname' in adres && adres.surname}
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