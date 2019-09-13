import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class ClassSearch extends Component {

  handleChange = event => this.props.updateSearchClass(event.target.value);

  render(){
    return(
      <span style={{ paddingRight: '10px' }}>
        <input
          placeholder='search class'
          value={this.props.searchClass}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

export default withXML(ClassSearch);