import React, { Component } from 'react';

const XMLContext = React.createContext();

export const XMLConsumer = XMLContext.Consumer;

export class XMLProvider extends Component {
  state = {
    year: null,
    semester: null,
    students: [],
    studentUserName: {},
    studentName: {},
    studentSurname: {},
    teachers: [],
    teacherUserName: {},
    teacherName: {},
    teacherSurname: {},
    grades: [],
    searchUserName: '',
    searchName: '',
    searchSurname: '',
    searchTeacherName: '',
    searchTeacherSurname: '',
    searchSubject: '',
    searchClass: '',
    studentClickedId: null,
    parsingTxt: '',
    presencesTypes: [],
    showStudentPresences: false,
    showLessonsEntries: false,
    // behaviors: [],

    resetSchool: () => this.setState({ year: null }),
    updateSchool: school => {
      const year = school.querySelector('year');
      this.setState({ year: year });
      const semester = year.querySelectorAll('semester');
      this.setState({ semester: semester });

      const students = Array.from(school.children[1].children);
      this.setState({ students: students });
      let studentId = {};
      let studentNm = {};
      let studentSn = {};
      let personalData = '';
      let el;
      for (el of students) {
        personalData = el.querySelector('personal_data').innerHTML;
        studentId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        studentNm[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.name : '';
        studentSn[el.firstChild.innerHTML] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.surname : '';
      }
      this.setState({ studentUserName: studentId });
      this.setState({ studentName: studentNm });
      this.setState({ studentSurname: studentSn });

      const teachers = Array.from(school.children[2].children);
      this.setState({ teachers: teachers });
      let teacherId = {};
      let teacherNm = {};
      let teacherSn = {};
      for (el of teachers) {
        teacherId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        teacherNm[el.firstChild.innerHTML] = el.querySelector('first_name').innerHTML;
        teacherSn[el.firstChild.innerHTML] = el.querySelector('last_name').innerHTML;
      }
      this.setState({ teacherUserName: teacherId });
      this.setState({ teacherName: teacherNm });
      this.setState({ teacherSurname: teacherSn });

      let presencesTypes = [];
      let presType = Array.from(school.querySelector('presences_types').children);
      for (el of presType) {
        presencesTypes.push(el.firstChild.innerHTML);
      }
      this.setState({ presencesTypes: presencesTypes });
    },

    handleStudentClick: id => this.setState({ studentClickedId: id }),
    updateSearchUserName: text => this.setState({ searchUserName: text }),
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