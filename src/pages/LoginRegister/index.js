import React, { Component } from "react";

//UI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

//other
import Login from "./Login"
import Register from "./Register"

class LoginRegister extends Component {
  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={() => {
          this.props.closeModel();
        }}
      >
        <DialogContent>
          <div id="login-model">
            <Grid container spacing={8}>
              <Grid item xs={6}>
								<Register closeModel={this.props.closeModel} />
							</Grid>
							<Grid item xs={6}>
								<Login closeModel={this.props.closeModel}/>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LoginRegister;
