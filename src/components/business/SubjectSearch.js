import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class SubjectSearch extends Component {

  handleChange = event => this.props.updateSearchSubject(event.target.value);

  render(){
    return(
      <span style={{ padding: '0 10px' }}>
        <input
          placeholder='search subject'
          value={this.props.searchSubject}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

export default withXML(SubjectSearch);