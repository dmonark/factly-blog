import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

//UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

//other
import { getAllAuthorService } from "./../../services/author";
import SideBar from "./../Common/SideBar";

function EachAuthor(props){
	return(
		<Card className="each-blog">
			<CardContent>
				<List>
          <ListItem button component={Link} to={'/author/'+props.author._id}>
						<Avatar>{props.author.name[0]}</Avatar>
						<ListItemText
							primary={props.author.name}
							secondary={props.author.bio}
						/>
					</ListItem>
				</List>
			</CardContent>
		</Card>
	)
}

class AuthorsFeed extends Component {	
  componentDidMount() {
    const { authors } = this.props.filter;
		const { dispatch } = this.props;
		if(authors.length === 0)
			getAllAuthorService(dispatch);
  }
	render() {
    const { authors } = this.props.filter;
    var authorList = [];
    for (var i = 0; i < authors.length; i++) {
      authorList.push(<EachAuthor key={"authors"+i} author={authors[i]} />);
    }
    
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={4}>
            {authorList}
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { filter } = state;
  return {
    filter
  };
}

const connectedAuthorsFeed = connect(mapStateToProps)(AuthorsFeed);
export default connectedAuthorsFeed;