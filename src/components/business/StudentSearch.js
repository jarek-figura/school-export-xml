import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class StudentSearch extends Component {

  handleSearchUserName = event => this.props.updateSearchUserName(event.target.value);
  handleSearchName = event => this.props.updateSearchName(event.target.value);
  handleSearchSurname = event => this.props.updateSearchSurname(event.target.value);

  render(){
    return(
      <span>
        <input style={{ maxWidth: '80px', marginRight: '5px' }}
          placeholder='user name'
          value={this.props.searchUserName}
          onChange={this.handleSearchUserName}
        />
        <input style={{ maxWidth: '80px', marginRight: '5px' }}
          placeholder='name'
          value={this.props.searchName}
          onChange={this.handleSearchName}
        />
        <input style={{ maxWidth: '80px' }}
          placeholder='surname'
          value={this.props.searchSurname}
          onChange={this.handleSearchSurname}
        />
      </span>
    );
  }
}

export default withXML(StudentSearch);