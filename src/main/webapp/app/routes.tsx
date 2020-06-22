import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable';

import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
// import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import {AUTHORITIES} from 'app/config/constants';
import MobileRegister from 'app/modules/login/mobileRegister/mobileRegister';
import OtpVerification from 'app/modules/login/otp/otpVerification';
import SetPassword from 'app/modules/login/setPassword/SetPassword';
import Login from 'app/modules/login/lgoin/Login';
import Profile from 'app/modules/profile/profile';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route exact path="/" component={MobileRegister}/>
      <Route path="/user-login" component={Login}/>
      <Route path="/mobile-register" component={MobileRegister}/>
      <Route path="/OTP-verification" component={OtpVerification}/>
      <Route path="/set-passsword" component={SetPassword}/>
      <Route path="/profile" component={Profile}/>
      {/* <ErrorBoundaryRoute path="/logout" component={Logout} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute path="/" exact component={Home} />
      <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute component={PageNotFound} /> */}
    </Switch>
  </div>
);

export default Routes;
