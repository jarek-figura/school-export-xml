import React, { Component } from 'react';
import { withXML } from '../contexts/XML';

// TODO: OK - Do przedmiotów dodać imię i nazwisko nauczyciela prowadzącego
// TODO: OK - Dodać imię i nazwisko ucznia obok 'user name' przy ocenach
// TODO: OK - Kliknięcie ucznia powinno pokazać tylko te klasy, w któych miał oceny (w obu semestrach); wszystko inne ukryte, bo teraz jest nieintuicyjnie
// TODO: OK - Dodać ocenę końcową/semestralną
// TODO: line 82 - dlaczego działa z console.log, a bez tego nie działa dobrze?
// TODO: Dodać frekwencję - tylko info o statusie innym niż "obecny" + data + godzina lekcyjna
// TODO: Dodać tekst 'Parsing XML ...' na zmianę stanu komponentów
// TODO: OK - Dodać filtrowanie przedmiotów

// TODO: INFO - ocena średnia (Average) zakomentowana tymczasowo; dodatkowo powinny być w niej uwzględniane wagi

const parsePresence = data => {
  data = data && data.length && data.replace(/u'/g, '\'');
  return data && data.length && data.replace(/'/g, '"');
};

export class Grade extends Component {

  componentDidMount() {
    this.props.updateParsingTxt('');
  }

  render() {
    const clickedId = this.props.studentClickedId;
    const grade = this.props.subject.querySelector('columns');
    const grades = grade && JSON.parse(grade.innerHTML);
    let studentData = this.props.subject.querySelector('students');
    studentData = grade && JSON.parse(studentData.innerHTML);

    // PRESENCES START ##########################

    let presenceData;
    let presence = this.props.subject.querySelector('presences').querySelector('presence');
    if (presence) {
      presenceData = presence.querySelector('data').innerHTML;
      presenceData = parsePresence(presenceData);
      if (presenceData.length > 2) {
        presenceData = JSON.parse(presenceData);
        /////////////////////////////////////////
        // console.log('\n==================\ntablica dł = ' + presenceData.length);
        // for (let obj of presenceData) {
        //   console.log(new Date(obj.date).toLocaleDateString('pl-PL'));
        //   console.log('----------');
        //   for (let std of obj.students) {
        //     console.log(this.props.studentUserName[std.student_id]);
        //     console.log(this.props.presencesTypes[std.presence]);
        //   }
        // }
        /////////////////////////////////////////
      }
    }

    // PRESENCES END ##########################

    let gradesDescr = {};
    let gradesLabel = {};
    let gradesType = {};
    let gradesLen = grades && grades.length;
    if (gradesLen) {
      for (let i = 0; i < gradesLen; i++) {
        gradesDescr[grades[i].id] = grades[i].description;
        gradesLabel[grades[i].id] = grades[i].label;
        gradesType[grades[i].id] = grades[i].type;
      }
    }

    let tmpClassName = {};
    if (clickedId) {
      tmpClassName[clickedId] = 'student-clicked-id';
    } else {
      tmpClassName[clickedId] = 'student-not-clicked';
    }

    let stdGrdObj = {};
    // let stdSummaryGrade = [];
    let stdFinalGrade = '';

    let keyId = 0;
    return (
      <table className='grades-table'>
        <tbody>
          <tr style={{ color: '#444' }}>
            <th style={{ backgroundColor: '#ddffff' }}>Student</th>
            <th style={{ backgroundColor: '#ddffff', borderRight: '1px solid #bbb' }}>User name</th>
            {
              grades && grades.map(
                grade => (
                  grade.type !== 2 &&
                  <th key={grade.id} title={grade.label.length ? grade.description : '———'}>{grade.label.length ? grade.label : '———'}</th>
                )
              )
            }
            {/* <th style={{ borderLeft: '1px solid #bbb' }}>Average</th> */}
            <th style={{ borderLeft: '1px solid #bbb', borderRight: '1px solid #bbb', color: 'maroon' }}>Final</th>
            {
              this.props.showStudentPresences && presenceData && Array.from(presenceData).map(
                obj => (
                  obj.date &&
                  <th key={keyId++} style={{ backgroundColor: '#def' }}>{new Date(obj.date).toLocaleDateString('pl-PL')}</th>
                )
              )
            }
          </tr>
          {
            studentData && studentData.map(
              student => (
                (clickedId === null) || (student.grades.length && student.student_id.toString() === clickedId)
                  ?
                  <tr key={student.student_id}>
                    {stdFinalGrade = null}
                    {/* {stdSummaryGrade = []} */}
                    <td className={`${tmpClassName[clickedId]}`}>{this.props.studentName[student.student_id]} {this.props.studentSurname[student.student_id]}</td>
                    <td style={{borderRight: '1px solid #bbb'}} className={`${tmpClassName[clickedId]}`}>{this.props.studentUserName[student.student_id]}</td>
                    {
                      Object.keys(gradesLabel).map(
                        gradeId => (
                          stdGrdObj = student.grades.filter(
                            stdGrade => (stdGrade.column_id === Number(gradeId))
                          )[0],
                          gradesType && gradesType[gradeId] === 2
                          ? (stdGrdObj && (stdFinalGrade = `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`), console.log())
                          : <td key={gradeId} style={{ whiteSpace: 'nowrap' }}>
                            {
                              stdGrdObj && gradesType && gradesType[gradeId] !== 2
                              ? (
                                  // stdGrdObj.included_in_the_average && stdSummaryGrade.push(stdGrdObj.percentage),
                                  `${stdGrdObj.label ? stdGrdObj.label : '0'} | ${stdGrdObj.percentage}%`
                                )
                              : '—'
                            }
                            </td>
                        )
                      )
                    }
                    {/* <td style={{ borderLeft: '1px solid #bbb', fontWeight: 'bold', color: '#444' }}>
                      {stdSummaryGrade.length ? (stdSummaryGrade.reduce((a, b) => a + b, 0) / stdSummaryGrade.length).toLocaleString('en-EN', { maximumFractionDigits: 1 }) : 0}%
                    </td> */}
                    <td style={{ borderLeft: '1px solid #bbb', borderRight: '1px solid #bbb', fontWeight: 'bold', color: 'maroon', whiteSpace: 'nowrap' }}>
                      {stdFinalGrade ? stdFinalGrade : '—'}
                    </td>
                    {
                      this.props.showStudentPresences && presenceData && Array.from(presenceData).map(
                        obj => (
                          obj.students && obj.students.map(
                            std => (
                              // this.props.studentUserName[std.student_id] - student.student_id
                              student.student_id === std.student_id &&
                              <td>{this.props.presencesTypes[std.presence]}</td>
                            )
                          )
                        )
                      )
                    }
                  </tr>
                : null
              )
            )
          }
        </tbody>
      </table>
    )
  }
}

export default withXML(Grade);