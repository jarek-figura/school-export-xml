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

    resetSchool: () => { this.setState({ year: null }) },
    updateSchool: school => {
      const year = school.querySelector('year');
      const semester = year.querySelectorAll('semester');

      const students = L.from(school.children[1].children);
      let studentId = L.empty();
      let studentNm = L.empty();
      let studentSn = L.empty();
      let personalData = '';
      L.forEach(el => {
        personalData = el.querySelector('personal_data').innerHTML;
        studentId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        studentNm[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.name : '';
        studentSn[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.surname : '';
      }, students);

      const teachers = L.from(school.children[2].children);
      let teacherId = L.empty();
      let teacherNm = L.empty();
      let teacherSn = L.empty();
      L.forEach(el => {
        teacherId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        teacherNm[el.firstChild.innerHTML] = el.querySelector('first_name').innerHTML;
        teacherSn[el.firstChild.innerHTML] = el.querySelector('last_name').innerHTML;
      }, teachers);

      let presencesTypes = L.empty();
      let presType = L.from(school.querySelector('presences_types').children);
      L.forEach(el => {
        L.append(el.firstChild.innerHTML, presencesTypes);
      }, presType);

      this.setState({
        year: year,
        semester: semester,
        students: students,
        studentUserName: studentId,
        studentName: studentNm,
        studentSurname: studentSn,
        teachers: teachers,
        teacherUserName: teacherId,
        teacherName: teacherNm,
        teacherSurname: teacherSn,
        presencesTypes: presencesTypes
      });
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