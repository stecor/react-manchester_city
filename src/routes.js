import React from 'react';
import Layout from './Hoc/Layout';
import { Switch } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';

import Dashboard from './components/admin/Dashboard'
import AdminMatches from './components/admin/matches'

import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';

const Routes = (props) =>{

  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact path="/admin_matches" component={AdminMatches} />
        <PrivateRoute {...props} exact path="/dashboard" component={Dashboard} />
        <PublicRoute {...props} exact path="/sign_in" component={SignIn} restricted={true}  />
        <PublicRoute {...props} exact path="/" component={Home} restricted={false} />
      </Switch>
    </Layout>
  )
}

export default Routes;
