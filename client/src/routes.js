import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Profilepage from "./profile/profilepage";
function Routes() {
  //TODO:Remove file input from confirm.js
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/profile" component={Profilepage} exact />
      </Switch>
    </Router>
  );
}
export default Routes;
