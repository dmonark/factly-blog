import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachmentIcon from "@material-ui/icons/Attachment";
import PortraitIcon from "@material-ui/icons/Portrait";

class SideBar extends Component {
	render() {
		
		return (
      <div>
				<Card className="each-blog">
					<CardContent className="text-left">
						<div>
							<Button component={Link} to="/" color="secondary"><HomeIcon />&nbsp;Home</Button>
						</div>
						<div>
							<Button component={Link} to="/profile" color="secondary"><AccountCircleIcon />&nbsp;Profile</Button>
						</div>
						<div>
							<Button component={Link} to="/authors" color="secondary"><PortraitIcon />&nbsp;Authors</Button>
						</div>
						<div>
							<Button component={Link} to="/categories" color="secondary"><AttachmentIcon />&nbsp;Categories</Button>
						</div>
					</CardContent>
				</Card>
      </div>
    );
  }
}

export default SideBar; 

