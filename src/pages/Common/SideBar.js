import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class SideBar extends Component {
	render() {
		
		return (
      <div>
				<Card className="each-blog">
					<CardContent>
						<div>
						<Button component={Link} to="/profile" color="secondary">Profile</Button>
						</div>
						<div>
						<Button component={Link} to="/" color="secondary">Home</Button>
						</div>
						<div>
						<Button component={Link} to="/authors" color="secondary">Authors</Button>
						</div>
						<div>
						<Button component={Link} to="/categories" color="secondary">Categories</Button>
						</div>
					</CardContent>
				</Card>
      </div>
    );
  }
}

export default SideBar; 

