import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class TeacherSearch extends Component {

  handleSearchName = event => this.props.updateSearchTeacherName(event.target.value);
  handleSearchSurname = event => this.props.updateSearchTeacherSurname(event.target.value);

  render(){
    return(
      <span style={{ padding: '0 10px' }}>
        teacher: <input style={{ maxWidth: '80px', marginRight: '5px' }}
          placeholder='name'
          value={this.props.searchTeacherName}
          onChange={this.handleSearchName}
        />
        <input style={{ maxWidth: '80px' }}
          placeholder='surname'
          value={this.props.searchTeacherSurname}
          onChange={this.handleSearchSurname}
        />
      </span>
    );
  }
}

export default withXML(TeacherSearch);