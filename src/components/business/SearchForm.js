import React, { PureComponent } from 'react';
import { withXML } from "../contexts/XML";

import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class SearchForm extends PureComponent {

  state = {
    name: ''
  };

  handleChange = event => this.setState({ name: event.target.value });
  handleReset = () => {
    this.setState({ name: '' });
    this.props.updateSearchFunction('');
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.updateSearchFunction(this.state.name);
  };

  render() {

    const startAdornment = <InputAdornment position='start' style={{ marginLeft: '-8px' }}>{this.props.icon}</InputAdornment>;

    return (
      <form
          style={{ display: 'inline-block', backgroundColor: 'transparent', padding: '0' }}
          name='name'
          onSubmit={this.handleSubmit}
      >
        <TextField
          style={{ maxWidth: this.props.width, backgroundColor: '#ffffffbb' }}
          id='filled-adornment-extra-dense'
          variant='outlined'
          margin='dense'
          label={this.props.label}
          placeholder={this.props.placeholder}
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          InputProps={{
            startAdornment: this.props.startAdornment && startAdornment,
            endAdornment: <InputAdornment position='end' style={{ margin: '0 -8px' }}>
              <IconButton edge='end' name='name' onClick={this.handleReset}><ClearIcon /></IconButton>
            </InputAdornment>
          }}
        />
      </form>
    );
  }
}

export default withXML(SearchForm);