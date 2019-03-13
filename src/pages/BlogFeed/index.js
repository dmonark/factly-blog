import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//other
import { apiGetCall } from './../../services/network';

class BlogFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: []
		}
		this.getAllBlogs = this.getAllBlogs.bind(this)
	}
	
	componentDidMount(){
		this.getAllBlogs();
	}
	
	getAllBlogs(){
		var successCallback = function(data){
			this.setState({ 
				blogs: data
			});
		}.bind(this)
		
		var errorCallback = function(data){
			console.log("ERROR")
		}
		
		apiGetCall('/blog', successCallback, errorCallback)
	}
	
	render() {
		const { blogs } = this.state
    var blogList = []
		for(var i = 0; i < blogs.length; i++){
			blogList.push(
				<Grid key={blogs[i]._id}item xs={3}>
					<Card  className="blog-card">
						<CardContent>
							<Typography variant="h5" component="h2">{blogs[i].title}</Typography>
							<Typography component="p">{blogs[i].desc}</Typography>
						</CardContent>
						<CardActions>
							<Link to={"/blog/"+blogs[i]._id}>
								<Button size="small">Learn More</Button>
							</Link>
						</CardActions>
					</Card>
				</Grid>
			)
		}
		return (
      <div className="container">
				<Grid container spacing={8}>
					{blogList}
				</Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

const connectedBlogFeed = connect(mapStateToProps)(BlogFeed);
export default connectedBlogFeed; 

