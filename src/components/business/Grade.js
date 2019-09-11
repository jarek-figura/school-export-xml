import React, { Component, Fragment } from 'react';
import { withXML } from '../contexts/XML';

export class Grade extends Component {
  render() {
    const clickedId = this.props.studentClickedId;
    const grade = this.props.subject.querySelector('columns');
    const grades = grade && JSON.parse(grade.innerHTML);
    // console.log(grades);
    let studentData = this.props.subject.querySelector('students');
    studentData = grade && JSON.parse(studentData.innerHTML);

    let gradesDescr = {};
    let gradesLabel = {};
    let gradesLen = grades && grades.length;
    if (gradesLen) {
      for (let i = 0; i < gradesLen; i++) {
        gradesDescr[grades[i].id] = grades[i].description;
        gradesLabel[grades[i].id] = grades[i].label;
      }
    }

    let stId = 0;
    return (
      <ul>
        {/* {
          grades && grades.map(
            grade => (
              <li key={grade.id}>{grade.id} - {grade.label} - {grade.description}</li>
            )
          )
        } */}
        {
          studentData && studentData.map(
            student => (
              <Fragment key = {stId++}>
                {/* {student.student_id.toString() === clickedId
                  ? */}
                    <li>
                      {this.props.studentId[student.student_id]}
                      <ul>
                        {
                          student.grades.map(
                            grade => (
                              <li key = {stId++}>
                                <p>{gradesLabel[grade.column_id]} - {gradesDescr[grade.column_id]}</p>
                                <p>label: {grade.label}</p>
                                <p>precentage: {grade.percentage}</p>
                              </li>
                            )
                          )
                        }
                      </ul>
                    </li>
                  {/* :
                    null */}
                {/* } */}
              </Fragment>
            )
          )
        }
      </ul>
    );
  }
}

export default withXML(Grade);