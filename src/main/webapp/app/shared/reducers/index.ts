import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import appUser, {
  AppUserState
} from 'app/entities/app-user/app-user.reducer';
// prettier-ignore
import userOtp, {
  UserOtpState
} from 'app/entities/user-otp/user-otp.reducer';
// prettier-ignore
import receiver, {
  ReceiverState
} from 'app/entities/receiver/receiver.reducer';
// prettier-ignore
import thunesRequest, {
  ThunesRequestState
} from 'app/entities/thunes-request/thunes-request.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly appUser: AppUserState;
  readonly userOtp: UserOtpState;
  readonly receiver: ReceiverState;
  readonly thunesRequest: ThunesRequestState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  appUser,
  userOtp,
  receiver,
  thunesRequest,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
