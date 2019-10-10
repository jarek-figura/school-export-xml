import React, { Component } from 'react';
import { withXML } from "../contexts/XML";

import Input from '@material-ui/core/Input';

class StudentSearch extends Component {

  handleSearchUserName = event => this.props.updateSearchUserName(event.target.value);
  handleSearchName = event => this.props.updateSearchName(event.target.value);
  handleSearchSurname = event => this.props.updateSearchSurname(event.target.value);

  render(){
    return (
      <span>
        <Input style={{ maxWidth: '100px', marginRight: '10px' }}
          placeholder='user name'
          value={this.props.searchUserName}
          onChange={this.handleSearchUserName}
        />
        <Input style={{ maxWidth: '80px', marginRight: '10px' }}
          placeholder='name'
          value={this.props.searchName}
          onChange={this.handleSearchName}
        />
        <Input style={{ maxWidth: '120px' }}
          placeholder='surname'
          value={this.props.searchSurname}
          onChange={this.handleSearchSurname}
        />
      </span>
    );
  }
}

export default withXML(StudentSearch);