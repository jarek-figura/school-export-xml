import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class SubjectSearch extends Component {

  handleChange = event => this.props.updateSearchSubject(event.target.value);
  handleClick = () => this.props.updateSearchSubject('');

  render(){
    return (
      <Box mt={-0.5} mb={-0.5}>
        <TextField
          style={{ maxWidth: '170px', backgroundColor: '#ffffffbb' }}
          id="filled-adornment-extra-dense"
          variant="outlined"
          margin="dense"
          label="Przedmiot"
          placeholder='Przedmiot'
          value={this.props.searchSubject}
          onChange={this.handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start" style={{ marginLeft: '-5px' }}><SearchIcon /></InputAdornment>,
            endAdornment: <InputAdornment position="end" style={{ marginRight: '-5px' }}>
              <IconButton edge="end" onClick={this.handleClick}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
      </Box>
    );
  }
}

export default withXML(SubjectSearch);