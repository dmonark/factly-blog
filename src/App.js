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

//other
import { history } from './helpers';
import { userActions } from './actions';
import { apiCall } from './services/network';

class App extends Component {
	constructor(){
		super();
		this.state={
			loginModel: false,
			email: "monark@gmail.com",
			password: "12345",
			isFetching: false
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
      apiCall('POST', '/login', sendData, successCallback, errorCallback)
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
									<Button color="inherit" onClick={() => {this.handleLogout()}}>Logout</Button>
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
												id="standard-name"
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
												id="standard-name"
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
				</div>
				<div>
					<Router history={history}>
						<div>
							
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

