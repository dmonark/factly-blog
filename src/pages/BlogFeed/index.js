import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//other
import { apiGetCall } from './../../services/network';
import BlogCard from './BlogCard';

class BlogFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: []
		}
		this.getAllBlogs = this.getAllBlogs.bind(this)
	}
	
	componentDidMount(){
		this.getAllBlogs();
	}
	
	getAllBlogs(){
		var successCallback = function(data){
			this.setState({ 
				blogs: data
			});
		}.bind(this)
		
		var errorCallback = function(data){
			console.log("ERROR")
		}
		
		apiGetCall('/blog', successCallback, errorCallback)
	}
	
	render() {
		const { blogs } = this.state
    var blogList = []
		for(var i = 0; i < blogs.length; i++){
			blogList.push(
				<BlogCard
					blog={blogs[i]}
					key={blogs[i]._id}
				/>
			)
		}
		return (
      <div>
				<Grid container spacing={8}>
					<Grid item xs={3}>
					</Grid>
					<Grid item xs={4}>
						{blogList}
					</Grid>
				</Grid>
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

const connectedBlogFeed = connect(mapStateToProps)(BlogFeed);
export default connectedBlogFeed; 

