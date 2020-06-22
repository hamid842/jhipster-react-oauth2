import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserOtp from './user-otp';
import UserOtpDetail from './user-otp-detail';
import UserOtpUpdate from './user-otp-update';
import UserOtpDeleteDialog from './user-otp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserOtpDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserOtpUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserOtpUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserOtpDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserOtp} />
    </Switch>
  </>
);

export default Routes;
