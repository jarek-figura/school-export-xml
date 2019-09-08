import React, { Component } from 'react';

const XMLContext = React.createContext();

export const XMLConsumer = XMLContext.Consumer;

export class XMLProvider extends Component {
  state = {
    students: [],
    teachers: [],
    classess: [],
    subjects: [],
    behaviors: [],
    grades: [],
    presences: [],
    lessons_entries: [],
    searchPhrase: '',

    updateStudents: students => this.setState({ students }),
    updateSearchPhrase: searchPhrase => this.setState({ searchPhrase })
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