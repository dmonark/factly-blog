import React, { Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import moment from "moment";

//UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

//other
import {
  apiGetCall,
  apiPostCall,
  apiDeleteCall
} from "./../../services/network";
import { blogActions, snackbarActions } from "./../../actions";

class BlogCardComment extends Component {
  render() {
		const { auth, comment } = this.props;
		return (
			<ListItem divider>
				<ListItemAvatar>
					<Avatar>{comment.user.name[0]}</Avatar>
					
				</ListItemAvatar>
				<ListItemText
					primary={comment.text}
					secondary={<RouterLink to={"/author/"+comment.user._id}>{comment.user.name}</RouterLink>}
				/>
				{
					auth.user && auth.user._id === comment.user._id ? (
						<ListItemSecondaryAction>
							<IconButton
								color="secondary"
								aria-label="Delete"
								onClick={() => {
									this.props.deleteComment(comment._id);
								}}
							>
								<DeleteForeverIcon />
							</IconButton>
						</ListItemSecondaryAction>
					) : null
				}
			</ListItem>
		);
	}
}

class BlogCardLike extends Component {
  render() {
		const { like } = this.props;
		return (
			<ListItem divider>
				<ListItemAvatar>
					<Avatar>{like.user.name[0]}</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={like.user.name}
				/>
			</ListItem>
		);
	}
}

class BlogCard extends Component {
  constructor(props) {
    super(props);
    var likedByUser = false;
    if (
      props.auth.user &&
      props.blog.likes.find(x => x.user === props.auth.user._id)
    )
      likedByUser = true;
    this.state = {
      commentOpen: false,
			likeOpen: false,
      newComment: "",
      comments: [],
			likes: [],
      liked: likedByUser
    };
    this.deleteComment = this.deleteComment.bind(this);
  }
  postComment() {
    var successCallback = function(data) {
      var commentsCopy = this.state.comments;
      commentsCopy.push({
        text: this.state.newComment,
        createdAt: Date.now(),
        user: this.props.auth.user
      });
      this.setState({
        newComment: "",
        comments: commentsCopy
      });
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);
    var sendData = {
      text: this.state.newComment
    };
    apiPostCall(
      "/blog/" + this.props.blog._id + "/comment",
      sendData,
      this.props.auth.token,
      successCallback,
      errorCallback
    );
  }
  getAllComments() {
    var successCallback = function(data) {
      this.setState({
        commentOpen: true,
        comments: data.comments
      });
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);

    apiGetCall(
      "/blog/" + this.props.blog._id + "/comment",
      successCallback,
      errorCallback
    );
  }
	getAllLikes() {
    var successCallback = function(data) {
      this.setState({
				likeOpen: true,
        likes: data.likes
      });
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);

    apiGetCall(
      "/blog/" + this.props.blog._id + "/likes",
      successCallback,
      errorCallback
    );
  }
  likeUnlike(actionType) {
    var successCallback = function(data) {
      this.setState({
        liked: actionType
      });
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);
    var whichURL = actionType ? "/like" : "/unlike";
    apiPostCall(
      "/blog/" + this.props.blog._id + whichURL,
      {},
      this.props.auth.token,
      successCallback,
      errorCallback
    );
  }
  deleteBlog() {
    var successCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(blogActions.deleteBlog(data));
      dispatch(snackbarActions.addSnackbar("Successfully blog deleted"));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);
    apiDeleteCall(
      "/blog/" + this.props.blog._id,
      {},
      this.props.auth.token,
      successCallback,
      errorCallback
    );
  }
  deleteComment(commentID) {
    var successCallback = function(data) {
      var commentsCopy = this.state.comments;
      var removeIndex = commentsCopy.findIndex(x => x._id === commentID);
      commentsCopy.splice(removeIndex, 1);
      this.setState({
        comments: commentsCopy
      });
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Successfully comment deleted"));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);
    var deleteURL = "/blog/" + this.props.blog._id + "/comment/" + commentID;
    apiDeleteCall(
      deleteURL,
      {},
      this.props.auth.token,
      successCallback,
      errorCallback
    );
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { comments, likes } = this.state;
		const { categories } = this.props.filter;
		const { auth } = this.props
		var category = categories.find(x => x.value === this.props.blog.category)
    var commentList = [];
    for (var i = 0; i < comments.length; i++) {
      commentList.push(
        <BlogCardComment
          key={this.props.blog._id + "comment" + i}
          comment={comments[i]}
					auth={auth}
          deleteComment={this.deleteComment}
        />
      );
    }
		var likeList = [];
    for (var j = 0; j < likes.length; j++) {
      likeList.push(
        <BlogCardLike
          key={this.props.blog._id + "likes" + j}
          like={likes[j]}
        />
      );
    }
    return (
      <div className="each-blog">
        <Card className="blog-card">
          <CardContent>
            <Typography variant="overline" gutterBottom>
              In <Link component={RouterLink} to={"/category/"+category['value']}>{ category['name'] }</Link> by <Link component={RouterLink} to={"/author/"+this.props.blog.author._id}>{this.props.blog.author.name}</Link>, {moment(this.props.blog.createdAt).fromNow()}
            </Typography>
            <Typography variant="h5">
              {this.props.blog.title}
            </Typography>
            <Typography variant="body1">{this.props.blog.desc}</Typography>
          </CardContent>
					<Divider />
          <CardActions>
            <Chip
							avatar={<Avatar>{this.props.blog.likes.length}</Avatar>}
							label="Likes"
							color="secondary"
							onClick={() => {this.getAllLikes()}}
							variant="outlined"
						/>
						{
							this.props.auth.user && this.state.liked ? (
								<Button
									size="small"
									color="secondary"
									onClick={() => this.likeUnlike(false)}
								>
									<ThumbUpIcon />&nbsp;UNLIKE
								</Button>
							) : this.props.auth.user && !this.state.liked ? (
								<Button size="small" onClick={() => this.likeUnlike(true)}>
									<ThumbUpIcon />&nbsp;LIKE
								</Button>
							) : null
						}
            <Button
              size="small"
              onClick={() => {
                this.getAllComments();
              }}
            >
              <CommentIcon />&nbsp;COMMENT
            </Button>
            {
							this.props.auth.user && this.props.auth.user._id === this.props.blog.author._id ? (
								<Button
									size="small"
									color="secondary"
									onClick={() => this.deleteBlog()}
								>
									<DeleteForeverIcon />&nbsp;DELETE
								</Button>
							) : null
						}
          </CardActions>
					<Collapse in={this.state.likeOpen} timeout="auto">
            <CardContent>
              <Typography>Likes</Typography>
              <div>
                <List>
                  {likeList}
                </List>
              </div>
            </CardContent>
          </Collapse>
          <Collapse in={this.state.commentOpen} timeout="auto">
            <CardContent>
              <Typography>Comments</Typography>
              <div>
                {this.props.auth.user ? (
                  <Grid container spacing={8}>
                    <Grid item xs={10}>
                      <Input
                        fullWidth
                        value={this.state.newComment}
                        onChange={this.handleChange("newComment")}
                        placeholder="Write A Comment"
                        inputProps={{
                          "aria-label": "Comment"
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={this.state.newComment === ""}
                        onClick={() => {
                          this.postComment();
                        }}
                      >
                        POST
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography component="p">
                    Please login to post comment
                  </Typography>
                )}
              </div>
              <div>
                <List>
                  {commentList.length === 0 ? (
                    <Typography component="p">
                      Be the first one to comment
                    </Typography>
                  ) : (
                    commentList
                  )}
                </List>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </div>
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

const connectedBlogCard = connect(mapStateToProps)(BlogCard);
export default connectedBlogCard;