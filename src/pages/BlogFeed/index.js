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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

//other
import { apiGetCall } from './../../services/network';
import BlogCard from './BlogCard';

class BlogFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			author: "all",
			category: "all",
			authors: []
		}
		this.getAllBlogs = this.getAllBlogs.bind(this)
	}
	
	componentDidMount(){
		this.getAllBlogs();
		this.getAllAuthor();
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
		var callURL = "/blog?"
		if(this.state.category !== "all")
			callURL += "category=" + this.state.category + "&"
		if(this.state.author !== "all")
			callURL += "author=" + this.state.author + "&"
		
		apiGetCall(callURL, successCallback, errorCallback)
	}
	getAllAuthor(){
		var successCallback = function(data){
			this.setState({ 
				authors: data
			});
		}.bind(this)
		
		var errorCallback = function(data){
			console.log("ERROR")
		}
		
		apiGetCall('/user', successCallback, errorCallback)
	}
	handleChange = name => event => {
    this.setState({ 
			[name]: event.target.value 
		}, function() {
			this.getAllBlogs();
		});
	};
	render() {
		const { blogs, authors } = this.state
    var blogList = []
		for(var i = 0; i < blogs.length; i++){
			blogList.push(
				<BlogCard
					blog={blogs[i]}
					key={blogs[i]._id}
				/>
			)
		}
		var authorList = []
		for(var j = 0; j < authors.length; j++){
			authorList.push(
				<MenuItem key={"filter-author"+authors[j]._id} value={authors[j]._id}>{authors[j].name}</MenuItem>
			)
		}
		return (
      <div>
				<Grid container spacing={8}>
					<Grid item xs={1} />
					<Grid item xs={2}>
						<Card>
							<CardContent>
								<div className="filter-margin">
								<Typography component="h4">Filter</Typography>
								</div>
								<div className="filter-margin">
								<FormControl fullWidth>
									<InputLabel htmlFor="category-simple">Category</InputLabel>
									<Select
										value={this.state.category}
										onChange={this.handleChange('category')}
										inputProps={{
											name: 'category',
											id: 'category-simple',
										}}
									>
										<MenuItem value="all">All</MenuItem>
										<MenuItem value="science">Science</MenuItem>
										<MenuItem value="tech">Tech</MenuItem>
										<MenuItem value="Politics">Politics</MenuItem>
									</Select>
								</FormControl>
								</div>
								<div className="filter-margin">
								<FormControl fullWidth>
									<InputLabel htmlFor="author-simple">Author</InputLabel>
									<Select
										value={this.state.author}
										onChange={this.handleChange('author')}
										inputProps={{
											name: 'author',
											id: 'author-simple',
										}}
									>
										<MenuItem value="all">All</MenuItem>
										{authorList}
									</Select>
								</FormControl>
								</div>
							</CardContent>
						</Card>
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