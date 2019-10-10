import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

class ClassSearch extends Component {

  handleChange = event => this.props.updateSearchClass(event.target.value);
  handleClick = () => this.props.updateSearchClass('');

  render(){
    return(
      <TextField
        style={{ maxWidth: '150px', backgroundColor: '#ffffffbb' }}
        id="filled-adornment-extra-dense"
        variant="outlined"
        margin="dense"
        hiddenLabel
        placeholder='Class'
        value={this.props.searchClass}
        onChange={this.handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start" style={{ marginLeft: '-5px' }}><SearchIcon /></InputAdornment>,
          endAdornment: <InputAdornment position="end" style={{ marginRight: '-5px' }}>
            <IconButton edge="end" onClick={this.handleClick}><ClearIcon /></IconButton>
          </InputAdornment>
        }}
      />
    );
  }
}

export default withXML(ClassSearch);