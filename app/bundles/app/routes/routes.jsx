import React      from 'react';
import { Route }  from 'react-router';

import App        from '../layouts/Application';
import Landing      from '../components/Landing/Container';
import Login      from '../components/Login/LoginContainer';
import Logout     from '../components/Logout/Logout';
import NotFound   from '../components/NotFound/NotFound';
import MoreRoutes from './MoreRoutes';

export default context => (

  <Route name="app" component={App}>
    <Route name="landing"     path="/"        component={Landing} />
    {MoreRoutes(context)}
    <Route name="logout"      path="/logout"  component={Logout} />
    <Route name="not-found"   path="*"        component={NotFound} />
  </Route>
);
