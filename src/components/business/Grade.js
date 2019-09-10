import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

export class Grade extends Component {
  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? this.props.studentId[clickedId] : 0;
    console.log(userName);

    const grade = this.props.subject.querySelector('columns');
    const grades = grade && JSON.parse(grade.innerHTML);
    let studentData = this.props.subject.querySelector('students');
    studentData = grade && JSON.parse(studentData.innerHTML);
    console.log(studentData);

    return (
      <ul>
        {
          grades && grades.map(
            grade => (
              <li key={grade.id}>{grade.label} - {grade.description}</li>
            )
          )
        }
        {
          studentData && studentData.map(
            student => (
              student.grades.length !== 0 && <li>{userName[student.student_id]}</li>
            )
          )
        }
      </ul>
    );
  }
}

export default withXML(Grade);