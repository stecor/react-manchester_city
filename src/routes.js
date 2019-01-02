import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import SignIn from './components/signin';

const Routes = (props) =>{
  return(
    <Layout>
      <Switch>
        <Route   path="/sign_in" component={SignIn} />
        <Route   path="/" component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;
