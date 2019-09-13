import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class StudentSearch extends Component {

  handleChange = event => this.props.updateSearchPhrase(event.target.value);

  render(){
    return(
      <span style={{ paddingRight: '10px' }}>
        <input
          placeholder='user name'
          value={this.props.searchPhrase}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

export default withXML(StudentSearch);