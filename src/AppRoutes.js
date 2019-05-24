// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Home from './Login/Login'
import PersonList from './Lista/Form'
import LoginAdmin from './LoginGoogle/LoginAdmin';



const AppRoutes = () =>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/listPerson" component={PersonList} />
      <Route path="/loginAdmin" component={LoginAdmin} />
    </Switch>;

export default AppRoutes;
