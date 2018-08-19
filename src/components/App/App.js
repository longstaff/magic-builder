import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Global } from '../Css'

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
          <Route path="/" component={Home} exact={true}/>
          <Route path="/deck" component={DeckNew} exact={true}/>
          <Route path="/deck/:id" component={DeckView} exact={true}/>
          <Route path="/deck/:id/edit" component={DeckEdit} exact={true}/>
          <Route path="/deck/:id/history" component={DeckHistory} exact={true}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
