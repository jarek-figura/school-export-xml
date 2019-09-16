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
    // teachers: [],
    classess: [],
    subjects: [],
    behaviors: [],
    grades: [],
    // presences: [],
    // lessons_entries: [],
    searchPhrase: '',
    searchClass: '',
    studentClickedId: null,

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
    },

    handleStudentClick: id => this.setState({ studentClickedId: id }),
    updateSearchPhrase: text => this.setState({ searchPhrase: text }),
    updateSearchClass: text => this.setState({ searchClass: text })
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