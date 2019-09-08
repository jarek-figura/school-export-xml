import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class StudentSearch extends Component {

  handleChange = event => this.props.updateSearchPhrase(event.target.value);

  render(){
    return(
      <div>
        <input
          placeholder='students user name'
          value={this.props.searchPhrase}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withXML(StudentSearch);