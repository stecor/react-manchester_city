import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';

const Routes = (props) =>{
  return(
    <Layout>
      <Switch>
        <Route  component={Home}  path="/"/>test
      </Switch>
    </Layout>
  )
}

export default Routes;
