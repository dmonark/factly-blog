import React, { Component } from "react";
import { connect } from "react-redux";

//UI
import Grid from "@material-ui/core/Grid";
import { history } from './../../helpers';

//other
import SideBar from "./../Common/SideBar";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

class Setting extends Component {	
	constructor(props) {
    super(props);
    if(!this.props.auth.user)
			history.push('/');
	}
	render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={4}>
					{
						this.props.auth.user ? (
						<div>
							<div className="each-blog">
								<EditProfile />
							</div>
							<div className="each-blog">
								<ChangePassword />
							</div>
						</div>
						) : null
					}
					</Grid>
        </Grid>
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

const connectedSetting = connect(mapStateToProps)(Setting);
export default connectedSetting;