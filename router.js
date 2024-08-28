import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default (
  <Switch>
    <Route exact path="/landingPage" />
    <Route
      exact
      path="/"
    />
    <Route
      exact
      path="/home"
    />

    <Route exact path="/comingSoon" />
    <Route exact path="/about" />
    <Route exact path="/blog" />
    <Route
      exact
      path="/blogTagSearchPage"
    />

    <Route exact path="/bookSession" />

    <Route
      exact
      path="/event"
    />
    <Route exact path="/terms" />
    <Route path="/therapyTerms" />
    <Route exact path="/therapists" />
    <Route
      exact
      path="/raaheeBuddyHome"
    />
    <Route exact path="/about/values" />
    <Route exact path="/about/team" />
  </Switch>
);
