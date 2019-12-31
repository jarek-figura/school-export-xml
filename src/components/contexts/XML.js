import React, { PureComponent } from 'react';

const XMLContext = React.createContext();

export const XMLConsumer = XMLContext.Consumer;

export class XMLProvider extends PureComponent {
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

    resetSchool: () => this.setState({ year: null }),
    updateSchool: school => {
      const year = school.querySelector('year');
      const semester = year.querySelectorAll('semester');

      const students = Array.from(school.children[1].children);
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

      const teachers = Array.from(school.children[2].children);
      let teacherId = {};
      let teacherNm = {};
      let teacherSn = {};
      for (el of teachers) {
        teacherId[el.firstChild.innerHTML] = el.querySelector('username').innerHTML;
        teacherNm[el.firstChild.innerHTML] = el.querySelector('first_name').innerHTML;
        teacherSn[el.firstChild.innerHTML] = el.querySelector('last_name').innerHTML;
      }

      let presencesTypes = [];
      let presType = Array.from(school.querySelector('presences_types').children);
      for (el of presType) {
        presencesTypes.push(el.firstChild.innerHTML);
      }

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
    handleMutualPresLessClick: (flag1, flag2) => this.setState({
      showStudentPresences: flag1,
      showLessonEntries: flag2
    })
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