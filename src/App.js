import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

//UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';

//other
import { history } from './helpers';
import { userActions, snackbarActions } from './actions';

//Component
import BlogFeed from './pages/BlogFeed';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';

class App extends Component {
	constructor(){
		super();
		this.state={
			whichModel: ""
		}
	}
	
	handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	
	handleLogout(){
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		const { dispatch } = this.props;
		dispatch(userActions.logout());
		dispatch(snackbarActions.addSnackbar("Successfully logged out"));
	}
	
	render() {
		const { auth, snackbar } = this.props;
		const { dispatch } = this.props;
    return (
      <div className="App">
        <div className="nav-root">
					<AppBar position="static">
						<Toolbar variant="dense">
							<Typography variant="h6" color="inherit" className="nav-heading">
								Blogs
							</Typography>
							{
								auth.user ? (
									<div>
										<Button color="inherit" onClick={()=>{this.setState({whichModel: "post"})}}>
											<CloudUploadIcon /> POST
										</Button>
										<Button color="inherit" onClick={() => {this.handleLogout()}}>Logout</Button>
									</div>
								) : (
									<Button color="inherit" onClick={()=>{this.setState({whichModel: "login"})}}>Login</Button>
								)
							}
						</Toolbar>
					</AppBar>
					<div>
						<CreatePost show={this.state.whichModel === "post"} closeModel={() => {this.setState({whichModel: ""})}} />
					</div>
					<div>
						<Login show={this.state.whichModel  === "login"} closeModel={() => {this.setState({whichModel: ""})}} />
					</div>
				</div>
				<div className="container">
					<Router history={history}>
						<div>
							<Route path="/" exact component={BlogFeed} />
							<Route path="/blogs" component={BlogFeed} />
							{
								auth.user ? (
									<Route path="/profile" component={Profile} />
								) : null
							}			
						</div>
					</Router>
				</div>
				<div>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						open={snackbar.show}
						autoHideDuration={6000}
						onClose={() => {dispatch(snackbarActions.removeSnackbar())}}
						ContentProps={{
							'aria-describedby': 'message-id',
						}}
						message={<span id="message-id">{snackbar.message}</span>}
					/>
				</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	const { auth, snackbar } = state;
	return {
			auth,
			snackbar
	};
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp; 

