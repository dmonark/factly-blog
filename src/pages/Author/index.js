import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

//other
import { apiGetCall } from "./../../services/network";
import BlogCard from "./../Common/BlogCard";
import SideBar from "./../Common/SideBar";
import { blogActions, snackbarActions } from "./../../actions";
import { history } from './../../helpers';

class Category extends Component {
  constructor(props) {
    super(props);
    if( this.props.auth.user && this.props.auth.user._id === this.props.match.params.id)
			history.push('/profile');
		const { dispatch } = this.props;
    dispatch(blogActions.deleteEveryBlog());
    this.getAllBlogs = this.getAllBlogs.bind(this);
  }

  componentDidMount() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    var successCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(blogActions.addBlogs(data));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);

		const { id } = this.props.match.params
    
    var callURL = "/blog?";
    callURL += "author=" + id;
    
    apiGetCall(callURL, successCallback, errorCallback);
  }
  render() {
    const { blogs } = this.props.blogs;
		const { authors } = this.props.filter;
		const { id } = this.props.match.params
    const author = authors.find(x => x._id === id)
		var blogList = [];
    for (var i = 0; i < blogs.length; i++) {
      blogList.push(<BlogCard blog={blogs[i]} key={blogs[i]._id} />);
    }
    
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={4}>
						{
							author ? (
								<div className="each-blog">
									<Card>
										<CardContent>
											<List>
												<ListItem>
													<Avatar>{author.name[0]}</Avatar>
													<ListItemText
														primary={author.name}
														secondary={author.bio}
													/>
												</ListItem>
											</List>
										</CardContent>
									</Card>
								</div>
							) : null
						}
            <div>{blogList}</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, blogs, filter } = state;
  return {
		auth,
    blogs,
		filter
  };
}

const connectedCategory = connect(mapStateToProps)(Category);
export default connectedCategory;