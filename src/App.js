import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

//UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

//other
import { history } from './helpers';
import { userActions } from './actions';
import { apiPostCall } from './services/network';

//routes
import BlogFeed from './pages/BlogFeed';
import Blog from './pages/Blog';

class App extends Component {
	constructor(){
		super();
		this.state={
			loginModel: false,
			postModel: false,
			email: "monark@gmail.com",
			password: "12345",
			isFetching: false,
			title: "",
			desc: "",
			category: "all"
		}
	}
	
	handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	
	handleLogin(){
		this.setState({ 
			isFetching: true 
		});
		
		var successCallback = function(data){
			localStorage.setItem('user', JSON.stringify(data.user));
			localStorage.setItem('token', data.token);
			const { dispatch } = this.props;
			dispatch(userActions.login(data.user, data.token));
			this.setState({ 
				isFetching: false,
				loginModel: false
			});
		}.bind(this)
		
		var errorCallback = function(data){
			this.setState({ 
				isFetching: false
			});
		}
		
		const { email, password } = this.state;
    
    if (email && password){
			var sendData = {
				email,
				password
			}
      apiPostCall('/login', sendData, null, successCallback, errorCallback)
		}
	}
	
	addPost(){
		this.setState({ 
			isFetching: true 
		});
		
		var successCallback = function(data){
			this.setState({ 
				isFetching: false,
				postModel: false
			});
		}.bind(this)
		
		var errorCallback = function(data){
			this.setState({ 
				isFetching: false
			});
		}
		
		const { title, desc, category } = this.state;
    
    if (title && desc && category){
			var sendData = {
				title,
				desc,
				category
			}
      apiPostCall('/blog', sendData, this.props.auth.token, successCallback, errorCallback)
		}
	}
	
	handleLogout(){
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		const { dispatch } = this.props;
		dispatch(userActions.logout());
	}
	
	render() {
		const { auth } = this.props;
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
										<Button color="inherit" onClick={()=>{this.setState({postModel: true})}}>
											<CloudUploadIcon /> POST
										</Button>
										<Button color="inherit" onClick={() => {this.handleLogout()}}>Logout</Button>
									</div>
								) : (
									<Button color="inherit" onClick={()=>{this.setState({loginModel: true})}}>Login</Button>
								)
							}
						</Toolbar>
					</AppBar>
					<div>
						<Dialog
              open={this.state.loginModel}
              onClose={() => {this.setState({loginModel: false})}}
            >
              <DialogTitle>Login</DialogTitle>  
              <DialogContent>
								<div id="login-model">
								<Grid container spacing={8}>	
									<Grid item xs={6}></Grid>
									<Grid item xs={6}>
										<div>
											<TextField
												fullWidth
												id="login-email"
												label="Email"
												value={this.state.email}
												onChange={this.handleChange('email')}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div>
											<TextField
												fullWidth
												id="login-password"
												label="Password"
												type="password"
												value={this.state.password}
												onChange={this.handleChange('password')}
												margin="normal"
												variant="outlined"
											/>
										</div>
										<div id="login-btn">
											<Button fullWidth variant="outlined" color="primary" onClick={() => {this.handleLogin()}}>
												LOGIN
											</Button>
										</div>
									</Grid>
								</Grid>
								</div>
							</DialogContent>
						</Dialog>
					</div>
					<div>
						<Dialog
              open={this.state.postModel}
              onClose={() => {this.setState({postModel: false})}}
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
											onChange={this.handleChange('title')}
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
											onChange={this.handleChange('category')}	
											margin="normal"
											variant="outlined"
										>
											<MenuItem value="science">Science</MenuItem>
											<MenuItem value="tech">Tech</MenuItem>
											<MenuItem value="Politics">Politics</MenuItem>
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
											onChange={this.handleChange('desc')}
											margin="normal"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={9}>
									</Grid>
									<Grid item xs={3}>
										<Button fullWidth variant="outlined" color="primary" onClick={() => {this.addPost()}}>
											POST
										</Button>
									</Grid>
								</Grid>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="container">
					<Router history={history}>
						<div>
							<Router history={history}>
                <div>
									<Route path="/blogs" component={BlogFeed} />
									<Route path="/blog/:id" component={Blog} />								
								</div>
							</Router>
						</div>
					</Router>
				</div>
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

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp; 

