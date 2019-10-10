import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class TeacherSearch extends Component {

  handleSearchName = event => this.props.updateSearchTeacherName(event.target.value);
  handleSearchSurname = event => this.props.updateSearchTeacherSurname(event.target.value);
  handleClickName = () => this.props.updateSearchTeacherName('');
  handleClickSurname = () => this.props.updateSearchTeacherSurname('');

  render(){
    return(
      <Box mb={0.5}> 
        <TextField
          style={{ maxWidth: '150px', backgroundColor: '#ffffffbb', marginRight: '8px' }}
          id="filled-adornment-extra-dense"
          variant="outlined"
          margin="dense"
          label="Teacher"
          placeholder='Name'
          value={this.props.searchTeacherName}
          onChange={this.handleSearchName}
          InputProps={{
            startAdornment: <InputAdornment position="start" style={{ marginLeft: '-5px' }}><SearchIcon /></InputAdornment>,
            endAdornment: <InputAdornment position="end" style={{ marginRight: '-5px' }}>
              <IconButton edge="end" onClick={this.handleClickName}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
        <TextField
          style={{ maxWidth: '160px', backgroundColor: '#ffffffbb' }}
          id="filled-adornment-extra-dense"
          variant="outlined"
          margin="dense"
          label="Teacher"
          placeholder='Surname'
          value={this.props.searchTeacherSurname}
          onChange={this.handleSearchSurname}
          InputProps={{
            startAdornment: <InputAdornment position="start" style={{ marginLeft: '-5px' }}><SearchIcon /></InputAdornment>,
            endAdornment: <InputAdornment position="end" style={{ marginRight: '-5px' }}>
              <IconButton edge="end" onClick={this.handleClickSurname}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
      </Box>
    );
  }
}

export default withXML(TeacherSearch);