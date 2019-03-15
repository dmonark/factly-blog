import React, { Component } from 'react';
import { connect } from 'react-redux';

class Blog extends Component {
	
	render() {
		
		return (
      <div>
				Hello
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

const connectedBlog = connect(mapStateToProps)(Blog);
export default connectedBlog; 

