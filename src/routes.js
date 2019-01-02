import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard'
import PrivateRoutes from './components/authRoutes/privateRoutes';

const Routes = (props) =>{

  return(
    <Layout>
      <Switch>
        <PrivateRoutes {...props} exact path="/dashboard" component={Dashboard} />
        <Route  exact path="/" component={Home} />
        <Route  exact path="/sign_in" component={SignIn} />
      </Switch>
    </Layout>
  )
}

export default Routes;
