import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

class TeacherSearch extends Component {

  handleSearchName = event => this.props.updateSearchTeacherName(event.target.value);
  handleSearchSurname = event => this.props.updateSearchTeacherSurname(event.target.value);

  render(){
    return(
      <Box mb={2.6}>
        teacher: <Input
          style={{ maxWidth: '100px', marginRight: '10px' }}
          placeholder='name'
          value={this.props.searchTeacherName}
          onChange={this.handleSearchName}
        />
        <Input
          style={{ maxWidth: '120px' }}
          placeholder='surname'
          value={this.props.searchTeacherSurname}
          onChange={this.handleSearchSurname}
        />
      </Box>
    );
  }
}

export default withXML(TeacherSearch);