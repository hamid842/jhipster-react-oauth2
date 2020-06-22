import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AppUser from './app-user';
import UserOtp from './user-otp';
import Receiver from './receiver';
import ThunesRequest from './thunes-request';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}app-user`} component={AppUser} />
      <ErrorBoundaryRoute path={`${match.url}user-otp`} component={UserOtp} />
      <ErrorBoundaryRoute path={`${match.url}receiver`} component={Receiver} />
      <ErrorBoundaryRoute path={`${match.url}thunes-request`} component={ThunesRequest} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
