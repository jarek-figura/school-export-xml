import React, { PureComponent } from 'react';
import * as L from 'list';

const XMLContext = React.createContext();

export const XMLConsumer = XMLContext.Consumer;

export class XMLProvider extends PureComponent {
  state = {
    year: null,
    semester: null,
    students: L.empty(),
    studentUserName: L.empty(),
    studentName: L.empty(),
    studentSurname: L.empty(),
    teachers: L.empty(),
    teacherUserName: L.empty(),
    teacherName: L.empty(),
    teacherSurname: L.empty(),
    grades: L.empty(),
    searchUserName: '',
    searchName: '',
    searchSurname: '',
    searchTeacherName: '',
    searchTeacherSurname: '',
    searchSubject: '',
    searchClass: '',
    studentClickedId: null,
    parsingTxt: '',
    presencesTypes: L.empty(),
    showStudentPresences: false,
    showLessonsEntries: false,
    // behaviors: [],

    resetSchool: () => this.setState({ year: null }),
    updateSchool: school => {
      const year = school.querySelector('year');
      this.setState({ year: year });
      const semester = year.querySelectorAll('semester');
      this.setState({ semester: semester });

      const students = L.from(school.children[1].children);
      this.setState({ students: students });

      let studentId = L.empty();
      let studentNm = L.empty();
      let studentSn = L.empty();
      let personalData = '';
      let el;
      L.forEach(el => {
        personalData = el.querySelector('personal_data').innerHTML;
        studentId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        studentNm[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.name : '';
        studentSn[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.surname : '';
      }, students);
      // for (el of students) {
      //   personalData = el.querySelector('personal_data').innerHTML;
      //   studentId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
      //   studentNm[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.name : '';
      //   studentSn[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.surname : '';
      // }
      this.setState({ studentUserName: studentId });
      this.setState({ studentName: studentNm });
      this.setState({ studentSurname: studentSn });
      return null;

      const teachers = L.list(school.children[2].children);
      this.setState({ teachers: teachers });
      let teacherId = L.empty();
      let teacherNm = L.empty();
      let teacherSn = L.empty();
      for (el of teachers) {
        teacherId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        teacherNm[el.firstChild.innerHTML] = el.querySelector('first_name').innerHTML;
        teacherSn[el.firstChild.innerHTML] = el.querySelector('last_name').innerHTML;
      }
      this.setState({ teacherUserName: teacherId });
      this.setState({ teacherName: teacherNm });
      this.setState({ teacherSurname: teacherSn });

      let presencesTypes = L.empty();
      let presType = L.list(school.querySelector('presences_types').children);
      for (el of presType) {
        presencesTypes.push(el.firstChild.innerHTML);
      }
      this.setState({ presencesTypes: presencesTypes });
    },

    handleStudentClick: id => this.setState({ studentClickedId: id }),
    updateSearchUser: text => this.setState({ searchUserName: text }),
    updateSearchName: text => this.setState({ searchName: text }),
    updateSearchSurname: text => this.setState({ searchSurname: text }),
    updateSearchSubject: text => this.setState({ searchSubject: text }),
    updateSearchClass: text => this.setState({ searchClass: text }),
    updateSearchTeacherName: text => this.setState({ searchTeacherName: text }),
    updateSearchTeacherSurname: text => this.setState({ searchTeacherSurname: text }),
    updateParsingTxt: text => this.setState({ parsingTxt: text }),
    handleShowStudentPresences: flag => this.setState({ showStudentPresences: flag }),
    handleShowLessonEntries: flag => this.setState({ showLessonEntries: flag })
  };

  render() {
    return (
      <XMLContext.Provider value={this.state}>
        {this.props.children}
      </XMLContext.Provider>
    )
  }
}

export function withXML(Component) {
  function XMLAwareComponent(props) {
    return (
      <XMLConsumer>
        { propsFromContext => (<Component {...props} {...propsFromContext} />) }
      </XMLConsumer>
    )
  }

  XMLAwareComponent.displayName = `XMLAware(${Component.displayName || Component.name || 'Component'}`;

  return XMLAwareComponent
}