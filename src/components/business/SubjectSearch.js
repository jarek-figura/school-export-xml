import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class SubjectSearch extends Component {

  state = {
    name: ''
  };

  handleChange = event => this.setState({ name: event.target.value });
  handleReset = () => {
    this.setState({ name: '' });
    this.props.updateSearchSubject('');
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.updateSearchSubject(this.state.name);
  };

  render(){
    return (
      <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          name='name'
          onSubmit={this.handleSubmit}
      >
        <Box mt={-0.5} mb={-0.5}>
          <TextField
            style={{ maxWidth: '170px', backgroundColor: '#ffffffbb' }}
            id="filled-adornment-extra-dense"
            variant="outlined"
            margin="dense"
            label="Przedmiot"
            placeholder='Przedmiot'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start" style={{ marginLeft: '-8px' }}><SearchIcon /></InputAdornment>,
              endAdornment: <InputAdornment position="end" style={{ marginRight: '-8px' }}>
                <IconButton edge="end" name='name' onClick={this.handleReset}><ClearIcon /></IconButton>
              </InputAdornment>
            }}
          />
        </Box>
      </form>
    );
  }
}

export default withXML(SubjectSearch);