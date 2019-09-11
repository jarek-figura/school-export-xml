import React, { Component } from 'react';

const XMLContext = React.createContext();

export const XMLConsumer = XMLContext.Consumer;

export class XMLProvider extends Component {
  state = {
    school: null,
    year: null,
    semester: null,
    students: [],
    studentId: {},
    // teachers: [],
    classess: [],
    subjects: [],
    behaviors: [],
    grades: [],
    // presences: [],
    // lessons_entries: [],
    searchPhrase: '',
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
      for (let student of students) {
        studentId[student.firstChild.innerHTML] = student.querySelector('username').innerHTML;
      }
      this.setState({ studentId: studentId });
    },

    handleStudentClick: id => this.setState({ studentClickedId: id }),
    updateSearchPhrase: searchPhrase => this.setState({ searchPhrase: searchPhrase })
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