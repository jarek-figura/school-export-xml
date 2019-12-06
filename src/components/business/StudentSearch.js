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

  handleResetName = () => {
    this.setState({ name: '' });
    this.props.updateSearchName('');
  };
  handleResetSurname = () => {
    this.setState({ surname: '' });
    this.props.updateSearchSurname('');
  };
  handleResetUsername = () => {
    this.setState({ user: '' });
    this.props.updateSearchUserName('');
  };

  handleSubmitName = event => {
    event.preventDefault();
    this.props.updateSearchName(this.state.name);
  };
  handleSubmitSurname = event => {
    event.preventDefault();
    this.props.updateSearchSurname(this.state.surname);
  };
  handleSubmitUsername = event => {
    event.preventDefault();
    this.props.updateSearchUserName(this.state.user);
  };

  handleChangeName = event => this.setState({ name: event.target.value });
  handleChangeSurname = event => this.setState({ surname: event.target.value });
  handleChangeUsername = event => this.setState({ user: event.target.value });

  render(){
    return (
      <Box style={{ whiteSpace: 'nowrap' }}>
        <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          onSubmit={this.handleSubmitName}
        >
          <TextField
            style={{ maxWidth: '80px', margin: '0 8px 0 0' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Imię"
            placeholder='Imię'
            value={this.state.name}
            onChange={this.handleChangeName}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
                <IconButton edge="end" onClick={this.handleResetName}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </form>
        <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          onSubmit={this.handleSubmitSurname}
        >
          <TextField
            style={{ maxWidth: '120px', margin: '0 8px 0 0' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Nazwisko"
            placeholder='Nazwisko'
            value={this.state.surname}
            onChange={this.handleChangeSurname}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
                <IconButton edge="end" onClick={this.handleResetSurname}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </form>
        <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          onSubmit={this.handleSubmitUsername}
        >
          <TextField
            style={{ maxWidth: '146px', margin: '0' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Nazwa użytk."
            placeholder='Nazwa użytk.'
            value={this.state.user}
            onChange={this.handleChangeUsername}
            InputProps={{
              endAdornment: <InputAdornment position="end" style={{ margin: '0 -8px' }}>
                <IconButton edge="end" onClick={this.handleResetUsername}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </form>
      </Box>
    );
  }
}

export default withXML(StudentSearch);