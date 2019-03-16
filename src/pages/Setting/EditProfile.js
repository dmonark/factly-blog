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
import { userActions, snackbarActions } from "./../../actions";
import { apiPostCall } from "./../../services/network";

class EditProfile extends Component {	
  constructor(props) {
    super(props);
		var name = this.props.auth.user.name
		var bio = this.props.auth.user.bio
    this.state = {
      name: name,
			bio: bio
    };
  }
	handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
	handleUpdate(){
		var successCallback = function(data) {
      const { dispatch, auth } = this.props;
			var newUser = sendData
			newUser['_id'] = auth.user._id
      localStorage.setItem("user", JSON.stringify(newUser));
			dispatch(userActions.update(newUser));
      dispatch(snackbarActions.addSnackbar("Success, Profile updated"));
    }.bind(this);

    var errorCallback = function(data) {
      const { dispatch } = this.props;
      dispatch(snackbarActions.addSnackbar("Something went wrong"));
    }.bind(this);

    const { name, bio } = this.state;

    if (name && bio) {
      var sendData = {
        name,
        bio
      };
      apiPostCall("/user/update", sendData, this.props.auth.token, successCallback, errorCallback);
    }
	}
	render() {
    return (
      <Card>
				<CardContent>
					<div>
						<Typography variant="h5" className="text-left">Edit Profile</Typography>
					</div>
					<div>
						<TextField
							fullWidth
							id="update-name"
							label="Name"
							value={this.state.name}
							onChange={this.handleChange("name")}
							margin="normal"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
							fullWidth
							multiline
							rows="3"
							id="update-bio"
							label="Bio"
							value={this.state.bio}
							onChange={this.handleChange("bio")}
							margin="normal"
							variant="outlined"
						/>
					</div>
				</CardContent>
				<CardActions>
					<Grid container spacing={8}>
						<Grid item xs={10} />
						<Grid item xs={2}>
							<Button fullWidth variant="outlined" color="primary" onClick={() => {this.handleUpdate()}}>UPDATE</Button>
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

const connectedEditProfile = connect(mapStateToProps)(EditProfile);
export default connectedEditProfile;