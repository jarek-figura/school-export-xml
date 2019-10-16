import React, { Component } from 'react';
import { withXML } from "../contexts/XML";

import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class StudentSearch extends Component {

  handleSearchUserName = event => this.props.updateSearchUserName(event.target.value);
  handleSearchName = event => this.props.updateSearchName(event.target.value);
  handleSearchSurname = event => this.props.updateSearchSurname(event.target.value);
  handleClickUserName = () => this.props.updateSearchUserName('');
  handleClickName = () => this.props.updateSearchName('');
  handleClickSurname = () => this.props.updateSearchSurname('');

  render(){
    return (
      <Box style={{ whiteSpace: 'nowrap' }}>
        <TextField
          style={{ maxWidth: '80px', margin: '0 8px 0 0' }}
          id="filled-adornment-extra-dense"
          variant="outlined"
          margin="dense"
          label="Imię"
          placeholder='Imię'
          value={this.props.searchName}
          onChange={this.handleSearchName}
          InputProps={{
            endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
              <IconButton edge="end" onClick={this.handleClickName}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
        <TextField
          style={{ maxWidth: '120px', margin: '0 8px 0 0' }}
          id="filled-adornment-extra-dense"
          variant="outlined"
          margin="dense"
          label="Nazwisko"
          placeholder='Nazwisko'
          value={this.props.searchSurname}
          onChange={this.handleSearchSurname}
          InputProps={{
            endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
              <IconButton edge="end" onClick={this.handleClickSurname}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
        <TextField
          style={{ maxWidth: '146px', margin: '0' }}
          id="filled-adornment-extra-dense"
          variant="outlined"
          margin="dense"
          label="Nazwa użytk."
          placeholder='Nazwa użytk.'
          value={this.props.searchUserName}
          onChange={this.handleSearchUserName}
          InputProps={{
            endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
              <IconButton edge="end" onClick={this.handleClickUserName}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
      </Box>
    );
  }
}

export default withXML(StudentSearch);