import React      from 'react';
import { Route }  from 'react-router';

import App        from '../layouts/Application';
import Landing      from '../components/Landing/Container';
import Login from '../components/Login/LoginContainer';
import Signup from '../components/Signup/SignupContainer';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';
import GroupsRoutes from './groups';

export default context => (

  // <Route path="/" component={Application}>

  //   // Check a nivel de top component si esta logado.
  //   <Route component={PrivateApp}>
  //     <Route name="logout"      path="/logout"  component={Logout} />
  //     <Route name='groups' component={GroupsApp}>
  //       <Route path='members' component={GroupsMembers}/>
  //     </Route>
  //   </Route>

  //   <Route component={PublicApp}>
  //     <Route name='landing' path='/' component={Landing} />
  //     <Route name='login' path='/login' component={Login} context={context} onEnter={Login.WrappedComponent.checkAuth} />
  //     // <Route path="forgot-password" component={ForgotPassword}/>
  //   </Route>


  //   <Route name="not-found"   path="*"        component={NotFound} />
  // </Route>
    // {MoreRoutes(context)}

  <Route name='app' component={App}>
    <Route name='landing' path='/' component={Landing} />
    <Route key='login' name='login' path='/login' component={Login} context={context} onEnter={Login.WrappedComponent.checkAuth} />
    <Route key='signup' name='signup' path='/signup' component={Signup} context={context} onEnter={Signup.WrappedComponent.checkAuth} />
    <Route name='logout' path='/logout' component={Logout} />
    <Route name='not-found' path='*' component={NotFound} />
  </Route>
);
