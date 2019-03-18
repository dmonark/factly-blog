import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

//other
import { getAllAuthorService } from "./../../services/author";
import { getAllBlogsService, deleteAllBlogsService } from "./../../services/blogs";
import BlogCard from "./../Common/BlogCard";
import SideBar from "./../Common/SideBar";

class BlogFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "all",
      category: "all"
    };
    const { dispatch } = this.props;
    deleteAllBlogsService(dispatch)
  }

  componentDidMount() {
    const { authors } = this.props.filter;
		const { dispatch } = this.props;
		if(authors.length === 0)
			getAllAuthorService(dispatch);
		getAllBlogsService(dispatch, this.state.category, this.state.author);
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      function() {
				const { dispatch } = this.props;
        getAllBlogsService(dispatch, this.state.category, this.state.author);
      }
    );
  };
  render() {
    const { blogs } = this.props.blogs;
    const { authors, categories } = this.props.filter;
    var blogList = [];
    for (var i = 0; i < blogs.length; i++) {
      blogList.push(<BlogCard blog={blogs[i]} key={blogs[i]._id} />);
    }
    var authorList = [];
    for (var j = 0; j < authors.length; j++) {
      authorList.push(
        <MenuItem key={"filter-author" + authors[j]._id} value={authors[j]._id}>
          {authors[j].name}
        </MenuItem>
      );
    }
    var categoryList = [];
    for (var k = 0; k < categories.length; k++) {
      categoryList.push(
        <MenuItem key={"filter-category" + k} value={categories[k].value}>
          {categories[k].name}
        </MenuItem>
      );
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
						blogList.length === 0 ? (
							<Typography variant="Subheading">No posts found</Typography>
						) : blogList
					}
          </Grid>
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
                      onChange={this.handleChange("category")}
                      inputProps={{
                        name: "category",
                        id: "category-simple"
                      }}
                    >
                      <MenuItem value="all">All</MenuItem>
                      {categoryList}
                    </Select>
                  </FormControl>
                </div>
                <div className="filter-margin">
                  <FormControl fullWidth>
                    <InputLabel htmlFor="author-simple">Author</InputLabel>
                    <Select
                      value={this.state.author}
                      onChange={this.handleChange("author")}
                      inputProps={{
                        name: "author",
                        id: "author-simple"
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

const connectedBlogFeed = connect(mapStateToProps)(BlogFeed);
export default connectedBlogFeed;