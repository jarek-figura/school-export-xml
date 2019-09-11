import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';

export class Grade extends Component {
  render() {
    const clickedId = this.props.studentClickedId;
    // console.log(clickedId);
    // const userName = clickedId ? this.props.studentId[clickedId] : 0;
    // console.log(userName);

    const grade = this.props.subject.querySelector('columns');
    const grades = grade && JSON.parse(grade.innerHTML);
    let studentData = this.props.subject.querySelector('students');
    studentData = grade && JSON.parse(studentData.innerHTML);
    console.log(studentData);

    let keyId = 0;
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
              <Fragment>
                {console.log(clickedId)}
                {console.log(student.student_id.toString())}
                {student.student_id.toString() === clickedId
                  ?
                    < li key = {keyId++}>
                      {this.props.studentId[student.student_id]}
                    </li>
                  :
                    null
                }
              </Fragment>
            )
          )
        }
      </ul>
    );
  }
}

export default withXML(Grade);