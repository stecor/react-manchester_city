import React from 'react';
import Layout from './Hoc/Layout';
import { Switch } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';

import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';

import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players';
import AddEditPlayers from './components/admin/players/addEditPlayers';
import TheTeam from './components/theTeam';




const Routes = (props) =>{

  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact path="/admin_players/add_player" component={AddEditPlayers} />
        <PrivateRoute {...props} exact path="/admin_players/add_player/:id" component={AddEditPlayers} />
        <PrivateRoute {...props} exact path="/admin_players" component={AdminPlayers} />
        <PrivateRoute {...props} exact path="/admin_matches/edit_match" component={AddEditMatch} />
        <PrivateRoute {...props} exact path="/admin_matches/edit_match/:id" component={AddEditMatch} />
        <PrivateRoute {...props} exact path="/admin_matches" component={AdminMatches} />
        <PrivateRoute {...props} exact path="/dashboard" component={Dashboard} />
        <PublicRoute {...props} exact path="/the_team" component={TheTeam} restricted={false} />
        <PublicRoute {...props} exact path="/sign_in" component={SignIn} restricted={true}  />
        <PublicRoute {...props} exact path="/" component={Home} restricted={false} />
      </Switch>
    </Layout>
  )
}

export default Routes;
