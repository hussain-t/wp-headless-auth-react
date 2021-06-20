import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./Home";
import LoginForm from "./LoginForm";
import RegisterUserForm from "./RegisterUserForm";
import Profile from "./Profile";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterUserForm} />
      <ProtectedRoute path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
