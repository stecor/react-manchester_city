import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard'

const Routes = (props) =>{
  return(
    <Layout>
      <Switch>
        <Route  exact path="/" component={Home} />
        <Route  exact path="/sign_in" component={SignIn} />
        <Route  exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Layout>
  )
}

export default Routes;
