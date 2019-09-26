import React, { Component } from 'react';

const XMLContext = React.createContext();

export const XMLConsumer = XMLContext.Consumer;

export class XMLProvider extends Component {
  state = {
    school: null,
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
    searchSubject: '',
    searchClass: '',
    studentClickedId: null,
    parsingTxt: '',
    // classes: [],
    // subjects: [],
    // behaviors: [],
    // presences: [],
    // lessons_entries: [],

    updateSchool: school => {
      this.setState({ school: school })
      const year = school.querySelector('year');
      this.setState({ year: year });
      const semester = year.querySelectorAll('semester');
      this.setState({ semester: semester });

      const students = Array.from(school.children[1].children);
      this.setState({ students: students });
      let studentId = {};
      let studentNm = {};
      let studentSn = {};
      for (let std of students) {
        studentId[std.firstChild.innerHTML] = std.querySelector('username').innerHTML;
        studentNm[std.firstChild.innerHTML] = std.querySelector('personal_data').innerHTML ? JSON.parse(std.querySelector('personal_data').innerHTML).adres.name : 'John';
        studentSn[std.firstChild.innerHTML] = std.querySelector('personal_data').innerHTML ? JSON.parse(std.querySelector('personal_data').innerHTML).adres.surname : 'Doe';
      }
      this.setState({ studentUserName: studentId });
      this.setState({ studentName: studentNm });
      this.setState({ studentSurname: studentSn });

      const teachers = Array.from(school.children[2].children);
      this.setState({ teachers: teachers });
      let teacherId = {};
      let teacherNm = {};
      let teacherSn = {};
      for (let std of teachers) {
        teacherId[std.firstChild.innerHTML] = std.querySelector('username').innerHTML;
        teacherNm[std.firstChild.innerHTML] = std.querySelector('first_name').innerHTML;
        teacherSn[std.firstChild.innerHTML] = std.querySelector('last_name').innerHTML;
      }
      this.setState({ teacherUserName: teacherId });
      this.setState({ teacherName: teacherNm });
      this.setState({ teacherSurname: teacherSn });
    },

    handleStudentClick: id => this.setState({ studentClickedId: id }),
    updateSearchUserName: text => this.setState({ searchUserName: text }),
    updateSearchName: text => this.setState({ searchName: text }),
    updateSearchSurname: text => this.setState({ searchSurname: text }),
    updateSearchSubject: text => this.setState({ searchSubject: text }),
    updateSearchClass: text => this.setState({ searchClass: text }),
    updateParsingTxt: text => this.setState({ parsingTxt: text })
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