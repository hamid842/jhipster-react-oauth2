import { Moment } from 'moment';
import { IThunesRequest } from 'app/shared/model/thunes-request.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IReceiver {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  lastName2?: string;
  address?: string;
  address2?: string;
  address3?: string;
  direction1?: string;
  direction2?: string;
  direction3?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  phoneCountryCode?: string;
  email?: string;
  birthDate?: string;
  occupation?: string;
  countryOfBirth?: string;
  gender?: Gender;
  postalCode?: string;
  addressCity?: string;
  addressCountryCode?: string;
  idType?: string;
  idNumber?: string;
  idCountryCode?: string;
  idDeliveryDate?: string;
  createdDateTime?: string;
  isDeleted?: boolean;
  thunesRequests?: IThunesRequest[];
  appUserId?: number;
}

export const defaultValue: Readonly<IReceiver> = {
  isDeleted: false,
};
