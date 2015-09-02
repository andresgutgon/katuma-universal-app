import React      from 'react';
import { Route }  from 'react-router';

import Login from '../components/Login/LoginContainer';

export default context => {
  return [
    <Route key='login' name='login' path='/login' component={Login} context={context} onEnter={Login.WrappedComponent.checkAuth} />
  ];
}
