import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Grid from "@material-ui/core/Grid";

//other
import BlogCard from "./../Common/BlogCard";
import SideBar from "./../Common/SideBar";
import { getAllBlogsService, deleteAllBlogsService } from "./../../services/blogs";

class Category extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    deleteAllBlogsService(dispatch);
  }

  componentDidMount() {
		const { dispatch } = this.props;
		const { name } = this.props.match.params
    getAllBlogsService(dispatch, name, "all")
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