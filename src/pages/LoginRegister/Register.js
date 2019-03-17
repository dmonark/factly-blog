import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

//other
import { snackbarActions } from "./../../actions";
import { apiPostCall } from "./../../services/network";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
			name: "",
			bio: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	
	resetEverything() {
		this.setState({
			email: "",
			name: "",
			bio: "",
			password: ""
		})
	}
	
	handleRegister() {
    var successCallback = function(data) {
      this.props.closeModel();
			this.resetEverything();
			const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Success, Please Login"));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Registration failed"));
    }.bind(this);

    const { email, name, password, bio } = this.state;

    if (email && name && password && bio) {
      var sendData = {
        email,
				name,
				password,
				bio
      };
      apiPostCall("/register", sendData, null, successCallback, errorCallback);
    }
  }
  render() {
    return (
      <div>
				<div>
					<Typography variant="h5" className="text-left">Register</Typography>
				</div>
				<div>
					<TextField
						fullWidth
						id="register-email"
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
						id="register-name"
						label="Name"
						value={this.state.name}
						onChange={this.handleChange("name")}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div>
					<TextField
						id="register-bio"
						label="Bio"
						fullWidth
						multiline
						rows="3"
						value={this.state.bio}
						onChange={this.handleChange("bio")}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div>
					<TextField
						fullWidth
						id="register-password"
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
							this.handleRegister();
						}}
					>
						REGISTER
					</Button>
				</div>
			</div>
    );
  }
}

const connectedRegister = connect()(Register);
export default connectedRegister;