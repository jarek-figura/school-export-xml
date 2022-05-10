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
    presencesTypes: {},
    showStudentPresences: false,
    showLessonsEntries: false,

    resetSchool: () => {
        this.setState({
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
          subjectClickedId: null,
          parsingTxt: '',
          presencesTypes: {},
          showStudentPresences: false,
          showLessonsEntries: false,
          showEverything: false
        })
    },

    updateSchool: school => {
      const year = school.years.year;
      const semester = year.semesters.semester;
      const students = L.from(school.students.student);
      let studentUn = {};
      let studentNm = {};
      let studentSn = {};
      let personalData = '';
      L.forEach(el => {
        personalData = el.personal_data;
        studentUn[el.id] = el.username;
        studentNm[el.id] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.name : '';
        studentSn[el.id] = personalData && JSON.parse(personalData).hasOwnProperty('adres') ? JSON.parse(personalData).adres.surname : '';
      }, students);

      const teachers = L.from(school.teachers.teacher);
      let teacherUn = {};
      let teacherNm = {};
      let teacherSn = {};
      L.forEach(el => {
        teacherUn[el.id] = el.username;
        teacherNm[el.id] = el.first_name;
        teacherSn[el.id] = el.last_name;
      }, teachers);

      let presencesTypes = {};
      let presType = L.from(school.presences_types.presence_type);
      L.forEach(el => {
        presencesTypes[el.value] = el.name;
      }, presType);

      this.setState({
        year: year,
        semester: semester,
        students: students,
        studentUserName: studentUn,
        studentName: studentNm,
        studentSurname: studentSn,
        teachers: teachers,
        teacherUserName: teacherUn,
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