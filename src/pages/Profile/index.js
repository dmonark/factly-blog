import React, { Component } from 'react';
import { connect } from 'react-redux';

//UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

//other
import { apiGetCall } from './../../services/network';
import BlogCard from './../Common/BlogCard';
import { blogActions, snackbarActions } from './../../actions';
import SideBar from './../Common/SideBar';

class Blog extends Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		dispatch(blogActions.deleteEveryBlog());
		this.getAllBlogs = this.getAllBlogs.bind(this)
	}
	
	componentDidMount(){
		this.getAllBlogs();
	}
	
	getAllBlogs(){
		var successCallback = function(data){
			const { dispatch } = this.props;
			dispatch(blogActions.addBlogs(data));
		}.bind(this)
		
		var errorCallback = function(data){
			const { dispatch } = this.props;
			dispatch(snackbarActions.addSnackbar("Something went wrong"));
		}.bind(this)
		
		var callURL = "/blog?author="+this.props.auth.user._id
		apiGetCall(callURL, successCallback, errorCallback)
	}
	
	render() {
		const { auth } = this.props;
		const { blogs } = this.props.blogs
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
					<Grid item xs={1} >
					</Grid>
					<Grid item xs={2} >
						<SideBar />
					</Grid>
					<Grid item xs={4} >
						<div className="each-blog">
						<Card>
							<CardContent>
								<List>
									<ListItem>
										<Avatar>{auth.user.name[0]}</Avatar>
										<ListItemText primary={auth.user.name} secondary={auth.user.bio} />
									</ListItem>
								</List>
							</CardContent>
						</Card>
						</div>
						<div>
						{blogList}
						</div>
					</Grid>
				</Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { auth, blogs } = state;
    return {
        auth,
				blogs
    };
}

const connectedBlog = connect(mapStateToProps)(Blog);
export default connectedBlog; 

