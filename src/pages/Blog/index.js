import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Blog extends Component {
	
	render() {
		
		return (
      <div className="container">
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

