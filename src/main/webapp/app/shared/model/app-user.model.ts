import { Moment } from 'moment';
import { IThunesRequest } from 'app/shared/model/thunes-request.model';
import { IReceiver } from 'app/shared/model/receiver.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { KycStatus } from 'app/shared/model/enumerations/kyc-status.model';
import { UserStatus } from 'app/shared/model/enumerations/user-status.model';

export interface IAppUser {
  id?: number;
  membershipNo?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: Gender;
  birthDate?: string;
  countryOfBirth?: string;
  address?: string;
  postalCode?: string;
  addressCity?: string;
  addressCountryCode?: string;
  idType?: string;
  idDeliveryDate?: string;
  idNumber?: string;
  idCountryCode?: string;
  idExpiryDate?: string;
  idIssueDate?: string;
  userName?: string;
  employer?: string;
  userTermAndConditionAccepted?: boolean;
  userIsActive?: boolean;
  userFlag?: string;
  kycStatus?: KycStatus;
  userStatus?: UserStatus;
  occupation?: string;
  email?: string;
  photoIdType?: string;
  photoIdNumber?: string;
  photoIdState?: string;
  photoIdCountry?: string;
  legalIdType?: string;
  legalIdNumber?: string;
  legalIdIssueCountry?: string;
  dateOfBirth?: string;
  birthCity?: string;
  nationalityCountryCode?: string;
  mobilePhone?: string;
  mobilePhoneCountryCode?: string;
  createdDateTime?: string;
  modifiedDateTime?: string;
  isDeleted?: boolean;
  referenceCode?: string;
  referralCode?: string;
  otpStatusId?: number;
  thunesRequests?: IThunesRequest[];
  receivers?: IReceiver[];
}

export const defaultValue: Readonly<IAppUser> = {
  userTermAndConditionAccepted: false,
  userIsActive: false,
  isDeleted: false,
};
