import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

class ClassSearch extends Component {

  handleChange = event => this.props.updateSearchClass(event.target.value);

  render(){
    return(
      <Box ml={2.4} mt={2.4}>
        class: <Input
          style={{ maxWidth: '100px' }}
          placeholder='search'
          value={this.props.searchClass}
          onChange={this.handleChange}
        />
      </Box>
    );
  }
}

export default withXML(ClassSearch);