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
import SideBar from "./../Common/SideBar";

function EachCategory(props){
	return(
		<Card className="each-blog">
			<CardContent>
				<List>
          <ListItem button component={Link} to={'/category/'+props.category.value}>
						<Avatar>{props.category.name[0]}</Avatar>
						<ListItemText
							primary={props.category.name}
							secondary={"BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO BIO"}
						/>
					</ListItem>
				</List>
			</CardContent>
		</Card>
	)
}

class CategoriesFeed extends Component {	
  render() {
    const { categories } = this.props.filter;
    var categoryList = [];
    for (var i = 0; i < categories.length; i++) {
      categoryList.push(<EachCategory key={"categories"+i} category={categories[i]} />);
    }
    
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={4}>
            {categoryList}
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

const connectedCategoriesFeed = connect(mapStateToProps)(CategoriesFeed);
export default connectedCategoriesFeed;