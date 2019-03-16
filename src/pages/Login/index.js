import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

//other
import { userActions, snackbarActions } from "./../../actions";
import { apiPostCall } from "./../../services/network";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
			regEmail: "",
			regName: "",
			regBio: "",
			regPassword: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	
	resetEverything() {
		this.setState({
			email: "",
      password: "",
			regEmail: "",
			regName: "",
			regBio: "",
			regPassword: ""
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

    const { regEmail, regName, regPassword, regBio } = this.state;

    if (regEmail && regName && regPassword && regBio) {
      var sendData = {
        "email": regEmail,
				"name": regName,
				"password": regPassword,
				"bio": regBio
      };
      apiPostCall("/register", sendData, null, successCallback, errorCallback);
    }
  }
  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={() => {
          this.props.closeModel();
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <div id="login-model">
            <Grid container spacing={8}>
              <Grid item xs={6}>
								<div>
                  <TextField
                    fullWidth
                    id="register-email"
                    label="Email"
                    value={this.state.regEmail}
                    onChange={this.handleChange("regEmail")}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
								<div>
                  <TextField
                    fullWidth
                    id="register-name"
                    label="Name"
                    value={this.state.regName}
                    onChange={this.handleChange("regName")}
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
										value={this.state.regBio}
										onChange={this.handleChange("regBio")}
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
                    value={this.state.regPassword}
                    onChange={this.handleChange("regPassword")}
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
							</Grid>
							<Grid item xs={6}>
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
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export default connectedLogin;
