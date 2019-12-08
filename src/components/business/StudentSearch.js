import React, { Component } from 'react';
import { withXML } from "../contexts/XML";

import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class StudentSearch extends Component {

  state = {
    name: '',
    surname: '',
    user: ''
  };

  functionName = {
    name: this.props.updateSearchName,
    surname: this.props.updateSearchSurname,
    user: this.props.updateSearchUser
  };
  handleReset = event => {
    this.setState({ [event.currentTarget.name]: '' });
    (this.functionName[event.currentTarget.name])('');
  };
  handleSubmit = event => {
    event.preventDefault();
    const name = event.target.getAttribute('name');
    (this.functionName[name])(this.state[name]);
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    return (
      <Box style={{ whiteSpace: 'nowrap' }}>
        <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          name='name'
          onSubmit={this.handleSubmit}
        >
          <TextField
            style={{ maxWidth: '80px', margin: '0 8px 0 0' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Imię"
            placeholder='Imię'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
                <IconButton edge='end' name='name' onClick={this.handleReset}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </form>
        <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          name='surname'
          onSubmit={this.handleSubmit}
        >
          <TextField
            style={{ maxWidth: '120px', margin: '0 8px 0 0' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Nazwisko"
            placeholder='Nazwisko'
            name='surname'
            value={this.state.surname}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
                <IconButton edge='end' name='surname' onClick={this.handleReset}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </form>
        <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          name='user'
          onSubmit={this.handleSubmit}
        >
          <TextField
            style={{ maxWidth: '146px', margin: '0' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Nazwa użytk."
            placeholder='Nazwa użytk.'
            name='user'
            value={this.state.user}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
                <IconButton edge='end' name='user' onClick={this.handleReset}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </form>
      </Box>
    );
  }
}

export default withXML(StudentSearch);