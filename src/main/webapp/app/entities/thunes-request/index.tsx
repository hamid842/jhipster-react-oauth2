import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ThunesRequest from './thunes-request';
import ThunesRequestDetail from './thunes-request-detail';
import ThunesRequestUpdate from './thunes-request-update';
import ThunesRequestDeleteDialog from './thunes-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ThunesRequestDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ThunesRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ThunesRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ThunesRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={ThunesRequest} />
    </Switch>
  </>
);

export default Routes;
