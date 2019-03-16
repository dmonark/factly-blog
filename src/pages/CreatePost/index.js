import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

//other
import { apiPostCall } from "./../../services/network";
import { snackbarActions } from "./../../actions";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      desc: "",
      category: "all"
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addPost() {
    var successCallback = function(data) {
      this.props.closeModel();
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("New blog created"));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);

    const { title, desc, category } = this.state;

    if (title && desc && category) {
      var sendData = {
        title,
        desc,
        category
      };
      apiPostCall(
        "/blog",
        sendData,
        this.props.auth.token,
        successCallback,
        errorCallback
      );
    }
  }
  render() {
    const { categories } = this.props.filter;
    var categoryList = [];
    for (var k = 0; k < categories.length; k++) {
      categoryList.push(
        <MenuItem key={"filter-category" + k} value={categories[k].value}>
          {categories[k].name}
        </MenuItem>
      );
    }
    return (
      <Dialog
        open={this.props.show}
        onClose={() => {
          this.props.closeModel();
        }}
      >
        <DialogTitle>Post</DialogTitle>
        <DialogContent>
          <div id="post-model">
            <Grid container spacing={8}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="post-title"
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  id="post-title"
                  label="Category"
                  value={this.state.category}
                  onChange={this.handleChange("category")}
                  margin="normal"
                  variant="outlined"
                >
                  {categoryList}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="post-desc"
                  label="Desc"
                  fullWidth
                  multiline
                  rows="6"
                  value={this.state.desc}
                  onChange={this.handleChange("desc")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={9} />
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.addPost();
                  }}
                >
                  POST
                </Button>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  const { auth, filter } = state;
  return {
    auth,
    filter
  };
}

const connectedCreatePost = connect(mapStateToProps)(CreatePost);
export default connectedCreatePost;