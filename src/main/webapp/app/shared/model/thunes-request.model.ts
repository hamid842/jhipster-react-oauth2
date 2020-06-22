import { Moment } from 'moment';
import { ThunesTransactionStatus } from 'app/shared/model/enumerations/thunes-transaction-status.model';
import { ThunesTransactionType } from 'app/shared/model/enumerations/thunes-transaction-type.model';
import { ThunesPurposeOfRemittance } from 'app/shared/model/enumerations/thunes-purpose-of-remittance.model';

export interface IThunesRequest {
  id?: number;
  referenceNumber?: number;
  sourceAmount?: number;
  sourceCurrency?: string;
  destinationAmount?: number;
  destinationCurrency?: string;
  countryCode?: string;
  transactionStatus?: ThunesTransactionStatus;
  transactionType?: ThunesTransactionType;
  transactionDate?: string;
  feeAmount?: number;
  feeCurrency?: string;
  quotationId?: string;
  transactionId?: string;
  quotationCreationDate?: string;
  quotationExpirationDate?: string;
  senderFirstName?: string;
  senderLastName?: string;
  senderNationalityCountryCode?: string;
  senderBirthDate?: string;
  senderCountryOfBirth?: string;
  senderGender?: string;
  senderAddress?: string;
  senderPostalCode?: string;
  senderCity?: string;
  senderCountryCode?: string;
  senderMsisdn?: string;
  senderEmail?: string;
  senderIdType?: string;
  senderIdNumber?: string;
  senderIdCountryCode?: string;
  senderIdDeliveryDate?: string;
  senderOccupation?: string;
  beneficiaryFirstName?: string;
  beneficiaryLastName?: string;
  beneficiaryNationalityCountryCode?: string;
  beneficiaryBirthDate?: string;
  beneficiaryCountryOfBirth?: string;
  beneficiaryGender?: string;
  beneficiaryAddress?: string;
  beneficiaryPostalCode?: string;
  beneficiaryCity?: string;
  beneficiaryCountryCode?: string;
  beneficiaryMsisdn?: string;
  beneficiaryEmail?: string;
  beneficiaryIdType?: string;
  beneficiaryIdNumber?: string;
  beneficiaryIdCountryCode?: string;
  beneficiaryIdDeliveryDate?: string;
  beneficiaryOccupation?: string;
  creditPartyMsisdn?: string;
  creditPartyAccountNumber?: string;
  creditPartySwiftCode?: string;
  wholesaleFxRate?: number;
  mode?: string;
  additionalInfo1?: string;
  additionalInfo2?: string;
  additionalInfo3?: string;
  purposeRemittance?: ThunesPurposeOfRemittance;
  documentReferenceNumber?: string;
  callbackUrl?: string;
  transactionCreationDate?: string;
  transactionExpirationDate?: string;
  modifiedDate?: string;
  createdDate?: string;
  appUserId?: number;
  receiverId?: number;
}

export const defaultValue: Readonly<IThunesRequest> = {};