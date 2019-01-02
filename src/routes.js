import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import SignIn from './components/signin';

const Routes = (props) =>{
  return(
    <Layout>
      <Switch>
        <Route  exact path="/" component={Home} />
        <Route   path="/sign_in" component={SignIn} />
      </Switch>
    </Layout>
  )
}

export default Routes;
