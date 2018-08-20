import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Global } from '../Css'
import { BASE_URL } from '../../constants'

// Some dependency in the build needs this declaired as global.
// Dont ask me, I only work here.
import "regenerator-runtime/runtime";

import Home from '../Home';
import DeckNew from '../DeckNew';
import DeckView from '../DeckView';
import DeckEdit from '../DeckEdit';
import DeckHistory from '../DeckHistory';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={() => (<Redirect to={BASE_URL} />)} exact={true}/>
          <Route path={`${BASE_URL}`} component={Home} exact={true}/>
          <Route path={`${BASE_URL}deck`} component={DeckNew} exact={true}/>
          <Route path={`${BASE_URL}deck/:id`} component={DeckView} exact={true}/>
          <Route path={`${BASE_URL}deck/:id/edit`} component={DeckEdit} exact={true}/>
          <Route path={`${BASE_URL}deck/:id/history`} component={DeckHistory} exact={true}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
