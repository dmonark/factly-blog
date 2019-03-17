import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

//other
import { userActions, snackbarActions } from "./../../actions";
import { apiPostCall } from "./../../services/network";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	
	resetEverything() {
		this.setState({
			email: "",
      password: ""
		})
	}

  handleLogin() {
    var successCallback = function(data) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
			this.resetEverything();
      const { dispatch } = this.props;
      dispatch(userActions.login(data.user, data.token));
      this.props.closeModel();
      dispatch(snackbarActions.addSnackbar("Welcome " + data.user.name));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Auth failed"));
    }.bind(this);

    const { email, password } = this.state;

    if (email && password) {
      var sendData = {
        email,
        password
      };
      apiPostCall("/login", sendData, null, successCallback, errorCallback);
    }
  }
  render() {
    return (
			<div>
				<div>
					<Typography variant="h5" className="text-left">Login</Typography>
				</div>
				<div>
					<TextField
						fullWidth
						id="login-email"
						label="Email"
						value={this.state.email}
						onChange={this.handleChange("email")}
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
						onChange={this.handleChange("password")}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div id="login-btn">
					<Button
						fullWidth
						variant="outlined"
						color="primary"
						onClick={() => {
							this.handleLogin();
						}}
					>
						LOGIN
					</Button>
				</div>
      </div>
    );
  }
}

const connectedLogin = connect()(Login);
export default connectedLogin;
