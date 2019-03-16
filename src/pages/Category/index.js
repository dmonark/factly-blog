import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Grid from "@material-ui/core/Grid";

//other
import { apiGetCall } from "./../../services/network";
import BlogCard from "./../Common/BlogCard";
import SideBar from "./../Common/SideBar";
import { blogActions, snackbarActions } from "./../../actions";

class Category extends Component {
  constructor(props) {
    super(props);
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

		const { name } = this.props.match.params
    
    var callURL = "/blog?";
    callURL += "category=" + name;
    
    apiGetCall(callURL, successCallback, errorCallback);
  }
  render() {
    const { blogs } = this.props.blogs;
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
            {blogList}
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { blogs } = state;
  return {
    blogs
  };
}

const connectedCategory = connect(mapStateToProps)(Category);
export default connectedCategory;