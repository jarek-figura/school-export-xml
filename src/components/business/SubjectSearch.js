import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

class SubjectSearch extends Component {

  handleChange = event => this.props.updateSearchSubject(event.target.value);

  render(){
    return(
      <Box ml={0.3} mt={1} mb={1}>
        subject: <Input
          placeholder='search'
          value={this.props.searchSubject}
          onChange={this.handleChange}
        />
      </Box>
    );
  }
}

export default withXML(SubjectSearch);