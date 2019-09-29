import React, {Component} from 'react';
import { withXML } from "../contexts/XML";

class ClassSearch extends Component {

  handleChange = event => this.props.updateSearchClass(event.target.value);

  render(){
    return(
      <span style={{ padding: '0 10px' }}>
        class: <input
          style={{maxWidth: '80px'}}
          placeholder='search'
          value={this.props.searchClass}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

export default withXML(ClassSearch);