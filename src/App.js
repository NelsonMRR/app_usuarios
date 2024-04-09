import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/crear-usuario" component={CreateUser} />
        <Route path="/editar-usuario/:id" component={EditUser} />
      </Switch>
    </Router>
  );
}

export default App;
