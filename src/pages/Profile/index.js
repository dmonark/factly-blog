import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

//other
import BlogCard from "./../Common/BlogCard";
import SideBar from "./../Common/SideBar";
import { getAllBlogsService, deleteAllBlogsService } from "./../../services/blogs";

class Blog extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    deleteAllBlogsService(dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;
		const { user } = this.props.auth;
		getAllBlogsService(dispatch, "all", user._id)
  }

  render() {
    const { auth } = this.props;
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
            <div className="each-blog">
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      <Avatar>{auth.user.name[0]}</Avatar>
                      <ListItemText
                        primary={auth.user.name}
                        secondary={auth.user.bio}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </div>
            <div>
						{
							blogList.length === 0 ? (
								<Typography variant="Subheading">No posts found</Typography>
							) : blogList
						}
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