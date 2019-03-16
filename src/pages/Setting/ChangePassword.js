import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//other
import { snackbarActions } from "./../../actions";
import { apiPostCall } from "./../../services/network";

class ChangePassword extends Component {	
  constructor(props) {
    super(props);
		this.state = {
      oldPassword: "",
			newPassword: ""
    };
		this.handleChangePassword = this.handleChangePassword.bind(this)
  }
	handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	handleChangePassword(){
		var successCallback = function(data) {
			this.setState({
				oldPassword: "",
				newPassword: ""
			})
      const { dispatch } = this.props;
			dispatch(snackbarActions.addSnackbar("Success, Password Updated"));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);

    const { oldPassword, newPassword } = this.state;

    if (oldPassword && newPassword) {
      var sendData = {
        oldPassword,
        newPassword
      };
      apiPostCall("/user/change_password", sendData, this.props.auth.token, successCallback, errorCallback);
    }
	}
	render() {
    return (
      <Card>
				<CardContent>
					<div>
						<Typography variant="h5" className="text-left">Change Password</Typography>
					</div>
					<div>
						<TextField
							fullWidth
							type="password"
							id="update-old-password"
							label="Password"
							value={this.state.oldPassword}
							onChange={this.handleChange("oldPassword")}
							margin="normal"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
							fullWidth
							type="password"
							id="update-new-password"
							label="New Password"
							value={this.state.newPassword}
							onChange={this.handleChange("newPassword")}
							margin="normal"
							variant="outlined"
						/>
					</div>
				</CardContent>
				<CardActions>
					<Grid container spacing={8}>
						<Grid item xs={10} />
						<Grid item xs={2}>
							<Button fullWidth variant="outlined" color="primary" onClick={() => {this.handleChangePassword()}}>UPDATE</Button>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

const connectedChangePassword = connect(mapStateToProps)(ChangePassword);
export default connectedChangePassword;