import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import Grade from './Grade';

export class Clasa extends Component {

  render() {
    const clasa = this.props.clasa;
    const subjects = Array.from(clasa.querySelectorAll('subject'));
    let subjectId = 0;

    return (
      <div>
        {
          subjects.map(
            subject => (
              <span key={subjectId++}>
                <h4>subject: {subject.querySelector('name').innerHTML}</h4>
                <Grade subject={subject}/>
              </span>
            )
          )
        }
      </div>
    );
  }
}

export default withXML(Clasa);